'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { revalidatePath } from 'next/cache'

import { cookies, headers } from 'next/headers'

export async function getCurrentUser() {
  try {
    const payload = await getPayload({ config })
    const reqHeaders = await headers()
    const { user } = await payload.auth({ headers: reqHeaders })
    if (user) {
      return {
        email: (user.email as string) || 'yoelkys.rrg@gmail.com',
        name: (user.name as string) || 'Yoelkys R Rodriguez Gonzalez',
        role: (user.role as string) || 'admin',
      }
    }
  } catch (error) {
    console.error('Error fetching current user:', error)
  }
  return null
}

export async function loginUser(email: string, pass: string) {
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
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Credenciales inválidas'
    return { success: false, error: msg }
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

export async function getDashboardStats() {
  try {
    const payload = await getPayload({ config })
    const services = await payload.find({ collection: 'services', limit: 1 })
    const projects = await payload.find({ collection: 'projects', limit: 1 })
    const faqs = await payload.find({ collection: 'faqs', limit: 1 })
    const users = await payload.find({ collection: 'users', limit: 1 })

    return {
      services: services.totalDocs,
      projects: projects.totalDocs,
      faqs: faqs.totalDocs,
      users: users.totalDocs,
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return { services: 0, projects: 0, faqs: 0, users: 0 }
  }
}

export async function getCollectionItems(slug: string) {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: slug as 'users' | 'projects' | 'services' | 'faqs',
      limit: 100,
      overrideAccess: true,
    })
    return { success: true, docs: res.docs as unknown as Record<string, unknown>[] }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error(`Error fetching collection ${slug}:`, error)
    return { success: false, error: msg, docs: [] }
  }
}

export async function createCollectionItem(slug: string, data: Record<string, unknown>) {
  try {
    const payload = await getPayload({ config })
    const doc = await payload.create({
      collection: slug as 'users' | 'projects' | 'services' | 'faqs',
      data: data as never,
      overrideAccess: true,
    })
    revalidatePath('/admin')
    revalidatePath(`/admin/collections/${slug}`)
    revalidatePath('/')
    return { success: true, doc }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error(`Error creating item in ${slug}:`, error)
    return { success: false, error: msg }
  }
}

export async function updateCollectionItem(slug: string, id: string | number, data: Record<string, unknown>) {
  try {
    const payload = await getPayload({ config })
    const doc = await payload.update({
      collection: slug as 'users' | 'projects' | 'services' | 'faqs',
      id,
      data: data as never,
      overrideAccess: true,
    })
    revalidatePath('/admin')
    revalidatePath(`/admin/collections/${slug}`)
    revalidatePath('/')
    return { success: true, doc }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error(`Error updating item ${id} in ${slug}:`, error)
    return { success: false, error: msg }
  }
}

export async function deleteCollectionItem(slug: string, id: string | number) {
  try {
    const payload = await getPayload({ config })

    if (slug === 'users') {
      const reqHeaders = await headers()
      const { user } = await payload.auth({ headers: reqHeaders })
      if (user && String(user.id) === String(id)) {
        return { success: false, error: 'No podés eliminar tu propia cuenta de usuario' }
      }
    }

    await payload.delete({
      collection: slug as 'users' | 'projects' | 'services' | 'faqs',
      id,
      overrideAccess: true,
    })
    revalidatePath('/admin')
    revalidatePath(`/admin/collections/${slug}`)
    revalidatePath('/')
    return { success: true }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error(`Error deleting item ${id} in ${slug}:`, error)
    return { success: false, error: msg }
  }
}

export async function getGlobalData(slug: string) {
  try {
    const payload = await getPayload({ config })
    const data = await payload.findGlobal({
      slug: slug as 'hero-section' | 'about-section' | 'services-section' | 'projects-section' | 'faq-section' | 'contact-info',
      overrideAccess: true,
    })
    return { success: true, data: data as unknown as Record<string, unknown> }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error(`Error fetching global ${slug}:`, error)
    return { success: false, error: msg, data: null }
  }
}

export async function updateGlobalData(slug: string, data: Record<string, unknown>) {
  try {
    const payload = await getPayload({ config })
    const updated = await payload.updateGlobal({
      slug: slug as 'hero-section' | 'about-section' | 'services-section' | 'projects-section' | 'faq-section' | 'contact-info',
      data: data as never,
      overrideAccess: true,
    })
    revalidatePath('/admin')
    revalidatePath(`/admin/globals/${slug}`)
    revalidatePath('/')
    return { success: true, data: updated }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error(`Error updating global ${slug}:`, error)
    return { success: false, error: msg }
  }
}
