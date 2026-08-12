'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { revalidatePath } from 'next/cache'
import { cookies, headers } from 'next/headers'
import { checkLoginRateLimit } from '@/lib/rate-limit'

// ─── Allowlists ───────────────────────────────────────────────────────────────

const ALLOWED_COLLECTION_SLUGS = ['users', 'services', 'projects', 'faqs'] as const
type AllowedCollectionSlug = (typeof ALLOWED_COLLECTION_SLUGS)[number]

const ALLOWED_GLOBAL_SLUGS = [
  'hero-section',
  'about-section',
  'services-section',
  'projects-section',
  'faq-section',
  'contact-info',
] as const
type AllowedGlobalSlug = (typeof ALLOWED_GLOBAL_SLUGS)[number]

function assertCollectionSlug(slug: string): AllowedCollectionSlug {
  if (!ALLOWED_COLLECTION_SLUGS.includes(slug as AllowedCollectionSlug)) {
    throw new Error('Invalid collection')
  }
  return slug as AllowedCollectionSlug
}

function assertGlobalSlug(slug: string): AllowedGlobalSlug {
  if (!ALLOWED_GLOBAL_SLUGS.includes(slug as AllowedGlobalSlug)) {
    throw new Error('Invalid global section')
  }
  return slug as AllowedGlobalSlug
}

// ─── Auth helper ──────────────────────────────────────────────────────────────

async function requireAuth() {
  const payload = await getPayload({ config })
  const reqHeaders = await headers()
  const { user } = await payload.auth({ headers: reqHeaders })
  if (!user) throw new Error('Unauthorized')
  return { payload, user }
}

// ─── Public helpers ───────────────────────────────────────────────────────────

export async function getCurrentUser() {
  try {
    const payload = await getPayload({ config })
    const reqHeaders = await headers()
    const { user } = await payload.auth({ headers: reqHeaders })
    if (user) {
      return {
        email: (user.email as string) || '',
        name: (user.name as string) || '',
        role: (user.role as string) || 'admin',
      }
    }
  } catch {
    // silently return null — do not leak internal errors
  }
  return null
}

export async function loginUser(email: string, pass: string) {
  // ── Rate limiting — Fix #8 ──────────────────────────────────────────────────
  const reqHeaders = await headers()
  const ip =
    reqHeaders.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    reqHeaders.get('x-real-ip') ||
    'anonymous'

  const rateLimit = await checkLoginRateLimit(ip)
  if (!rateLimit.allowed) {
    const resetIn = Math.ceil((rateLimit.resetAt.getTime() - Date.now()) / 60000)
    return {
      success: false,
      error: `Demasiados intentos. Intentá de nuevo en ${resetIn} minuto${resetIn !== 1 ? 's' : ''}.`,
      rateLimited: true,
    }
  }
  // ─────────────────────────────────────────────────────────────────────────────

  try {
    const payload = await getPayload({ config })
    const res = await payload.login({
      collection: 'users',
      data: { email, password: pass },
    })

    if (res.token && res.user) {
      const cookieStore = await cookies()
      cookieStore.set('payload-token', res.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
        maxAge: 60 * 60 * 8,
      })
      return {
        success: true,
        user: {
          email: res.user.email,
          name: (res.user.name as string) || res.user.email,
          role: (res.user.role as string) || 'admin',
        },
      }
    }
  } catch {
    return { success: false, error: 'Credenciales inválidas' }
  }
  return { success: false, error: 'No se pudo iniciar sesión con esas credenciales' }
}

export async function logoutUser() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('payload-token')
    return { success: true }
  } catch {
    return { success: false }
  }
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export async function getDashboardStats() {
  try {
    await requireAuth() // Fix #1 — auth required
    const { payload } = await requireAuth()
    const [services, projects, faqs, users] = await Promise.all([
      payload.find({ collection: 'services', limit: 1 }),
      payload.find({ collection: 'projects', limit: 1 }),
      payload.find({ collection: 'faqs', limit: 1 }),
      payload.find({ collection: 'users', limit: 1 }),
    ])
    return {
      services: services.totalDocs,
      projects: projects.totalDocs,
      faqs: faqs.totalDocs,
      users: users.totalDocs,
    }
  } catch {
    return { services: 0, projects: 0, faqs: 0, users: 0 }
  }
}

// ─── Collection CRUD ──────────────────────────────────────────────────────────

export async function getCollectionItems(slug: string) {
  try {
    const validSlug = assertCollectionSlug(slug) // Fix #3 — runtime allowlist
    const { payload } = await requireAuth()       // Fix #1 — auth required
    const res = await payload.find({
      collection: validSlug,
      limit: 100,
    })
    return { success: true, docs: res.docs as unknown as Record<string, unknown>[] }
  } catch (error: unknown) {
    console.error(`Error fetching collection ${slug}:`, error)
    return { success: false, error: 'No se pudo obtener el listado', docs: [] } // Fix #6
  }
}

export async function createCollectionItem(slug: string, data: Record<string, unknown>) {
  try {
    const validSlug = assertCollectionSlug(slug) // Fix #3
    const { payload } = await requireAuth()       // Fix #1
    const doc = await payload.create({
      collection: validSlug,
      data: data as never,
    })
    revalidatePath('/admin')
    revalidatePath(`/admin/collections/${slug}`)
    revalidatePath('/')
    return { success: true, doc }
  } catch (error: unknown) {
    console.error(`Error creating item in ${slug}:`, error)
    return { success: false, error: 'No se pudo crear el registro' } // Fix #6
  }
}

export async function updateCollectionItem(
  slug: string,
  id: string | number,
  data: Record<string, unknown>,
) {
  try {
    const validSlug = assertCollectionSlug(slug) // Fix #3
    const { payload } = await requireAuth()       // Fix #1
    const doc = await payload.update({
      collection: validSlug,
      id,
      data: data as never,
    })
    revalidatePath('/admin')
    revalidatePath(`/admin/collections/${slug}`)
    revalidatePath('/')
    return { success: true, doc }
  } catch (error: unknown) {
    console.error(`Error updating item ${id} in ${slug}:`, error)
    return { success: false, error: 'No se pudo actualizar el registro' } // Fix #6
  }
}

export async function deleteCollectionItem(slug: string, id: string | number) {
  try {
    const validSlug = assertCollectionSlug(slug) // Fix #3
    const { payload, user } = await requireAuth() // Fix #1

    // Self-delete protection (double-checked server-side)
    if (validSlug === 'users' && String(user.id) === String(id)) {
      return { success: false, error: 'No podés eliminar tu propia cuenta de usuario' }
    }

    await payload.delete({
      collection: validSlug,
      id,
    })
    revalidatePath('/admin')
    revalidatePath(`/admin/collections/${slug}`)
    revalidatePath('/')
    return { success: true }
  } catch (error: unknown) {
    console.error(`Error deleting item ${id} in ${slug}:`, error)
    return { success: false, error: 'No se pudo eliminar el registro' } // Fix #6
  }
}

// ─── Globals CRUD ─────────────────────────────────────────────────────────────

export async function getGlobalData(slug: string) {
  try {
    const validSlug = assertGlobalSlug(slug) // Fix #3
    const { payload } = await requireAuth()   // Fix #1
    const data = await payload.findGlobal({ slug: validSlug })
    return { success: true, data: data as unknown as Record<string, unknown> }
  } catch (error: unknown) {
    console.error(`Error fetching global ${slug}:`, error)
    return { success: false, error: 'No se pudo obtener la sección', data: null } // Fix #6
  }
}

export async function updateGlobalData(slug: string, data: Record<string, unknown>) {
  try {
    const validSlug = assertGlobalSlug(slug) // Fix #3
    const { payload } = await requireAuth()   // Fix #1
    const updated = await payload.updateGlobal({
      slug: validSlug,
      data: data as never,
    })
    revalidatePath('/admin')
    revalidatePath(`/admin/globals/${slug}`)
    revalidatePath('/')
    return { success: true, data: updated }
  } catch (error: unknown) {
    console.error(`Error updating global ${slug}:`, error)
    return { success: false, error: 'No se pudo actualizar la sección' } // Fix #6
  }
}
