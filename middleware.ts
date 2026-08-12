import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_PATHS = ['/admin/login']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /admin/* routes
  if (!pathname.startsWith('/admin')) return NextResponse.next()

  // Allow explicitly public admin paths
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) return NextResponse.next()

  // Check for Payload session cookie
  const token = request.cookies.get('payload-token')?.value

  if (!token) {
    // Redirect to admin root where the AuthProvider login wall renders
    const loginUrl = new URL('/admin', request.url)
    loginUrl.searchParams.set('unauthorized', '1')
    // Already at /admin — let the client-side AuthProvider handle the login wall
    if (pathname === '/admin') return NextResponse.next()
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
