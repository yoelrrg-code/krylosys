'use client'

import React, { useState, useEffect } from 'react'
import { AdminSidebar } from './sidebar'
import { AdminHeader } from './header'
import { getCurrentUser } from '@/app/admin/actions'

import { Toaster } from 'sileo'
import 'sileo/styles.css'

import { AuthProvider } from './auth-provider'

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  // Desktop: sidebar starts open. Mobile: starts closed.
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string; role: string } | null>(null)

  // Detect desktop on mount and on resize
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setSidebarOpen(e.matches) // open on desktop, closed on mobile
    }
    handleChange(mq)
    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [])


  useEffect(() => {
    getCurrentUser().then((u) => setCurrentUser(u))
  }, [])

  return (
    <AuthProvider>
      <Toaster
        position="top-center"
        theme="dark"
        options={{
          fill: '#0D1322',
          roundness: 12,
        }}
      />
      <div className="min-h-screen bg-[#060913] flex font-sans antialiased text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
        {/* Sidebar */}
        <AdminSidebar
          currentUser={currentUser}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#060913]">
          <AdminHeader
            onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
            currentUser={currentUser}
          />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[#060913] overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  )
}
