'use client'

import React, { useState, useEffect } from 'react'
import { AdminSidebar } from './sidebar'
import { AdminHeader } from './header'
import { getCurrentUser } from '@/app/admin/actions'

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string; role: string } | null>(null)

  useEffect(() => {
    getCurrentUser().then((u) => setCurrentUser(u))
  }, [])

  return (
    <div className="min-h-screen bg-zinc-50/50 flex font-sans antialiased text-zinc-900">
      {/* Custom Left Sidebar */}
      <AdminSidebar currentUser={currentUser} isOpen={sidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <main className="flex-1 p-8 bg-zinc-50/30 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
