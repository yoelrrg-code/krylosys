'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { PanelLeft, LogOut } from 'lucide-react'

interface AdminHeaderProps {
  onToggleSidebar?: () => void
  currentUser?: { email?: string; name?: string; role?: string } | null
}

export function AdminHeader({ onToggleSidebar, currentUser }: AdminHeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const userName = currentUser?.name || 'Yoelkys R Rodriguez Gonzalez'
  const userEmail = currentUser?.email || 'yoelkys.rrg@gmail.com'
  const userInitial = userName.charAt(0).toUpperCase() || 'Y'

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="h-14 border-b border-slate-800 bg-[#0B0F19] px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      
      {/* Left side: Sidebar toggle only */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          title="Ocultar / Mostrar barra lateral"
          className="w-8 h-8 rounded-md border border-slate-800 bg-slate-900/60 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-slate-800/80 transition-all"
        >
          <PanelLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Right side: User Avatar & Dropdown Menu */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 flex items-center justify-center text-xs font-extrabold hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#0B0F19] transition-all shadow-md shadow-cyan-500/10"
          title={userName}
        >
          {userInitial}
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-[#0D1322] border border-slate-800 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="px-4 py-2 border-b border-slate-800/80">
              <p className="text-xs font-bold text-slate-100 truncate">{userName}</p>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">{userEmail}</p>
            </div>

            <div className="py-1">
              <Link
                href="/admin/logout"
                onClick={() => setDropdownOpen(false)}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Cerrar Sesión</span>
              </Link>
            </div>
          </div>
        )}
      </div>

    </header>
  )
}
