'use client'

import React, { useState, useEffect } from 'react'
import { AdminSidebar } from './sidebar'
import { AdminHeader } from './header'
import { getCurrentUser } from '@/app/admin/actions'

import { AuthProvider } from './auth-provider'

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string; role: string } | null>(null)

  useEffect(() => {
    getCurrentUser().then((u) => setCurrentUser(u))
  }, [])

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#060913] flex font-sans antialiased text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
        {/* Custom Left Sidebar */}
        <AdminSidebar currentUser={currentUser} isOpen={sidebarOpen} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#060913]">
          <AdminHeader
            onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
            currentUser={currentUser}
          />
          <main className="flex-1 p-6 sm:p-8 bg-[#060913] overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  )
}
