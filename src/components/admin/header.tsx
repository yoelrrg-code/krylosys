'use client'

import React from 'react'
import { Search, Bell, Sun, UserPlus, PanelLeft } from 'lucide-react'

interface AdminHeaderProps {
  onToggleSidebar?: () => void
}

export function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  return (
    <header className="h-14 border-b border-zinc-200 bg-white px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      
      {/* Left side: Sidebar toggle & Search input */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          title="Ocultar / Mostrar barra lateral"
          className="w-8 h-8 rounded-md border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-colors"
        >
          <PanelLeft className="w-4 h-4" />
        </button>

        <div className="relative flex items-center w-64">
          <Search className="w-4 h-4 absolute left-3 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-9 pr-4 py-1.5 bg-zinc-50 border border-zinc-200 rounded-md text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right side: Controls */}
      <div className="flex items-center gap-3">
        
        {/* Bell Button */}
        <button className="w-8 h-8 rounded-md border border-zinc-200 flex items-center justify-center text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-colors">
          <Bell className="w-4 h-4" />
        </button>

        {/* Theme Toggle */}
        <button className="w-8 h-8 rounded-md border border-zinc-200 flex items-center justify-center text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-colors">
          <Sun className="w-4 h-4" />
        </button>

        {/* Avatar Stack */}
        <div className="flex items-center -space-x-2">
          <div className="w-7 h-7 rounded-full border-2 border-white bg-zinc-900 text-white text-[10px] font-bold flex items-center justify-center">
            A
          </div>
          <div className="w-7 h-7 rounded-full border-2 border-white bg-zinc-700 text-white text-[10px] font-bold flex items-center justify-center">
            B
          </div>
          <div className="w-7 h-7 rounded-full border-2 border-white bg-zinc-500 text-white text-[10px] font-bold flex items-center justify-center">
            C
          </div>
        </div>

        {/* Invite Pill Button */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-zinc-200 rounded-md text-xs font-medium text-zinc-900 hover:bg-zinc-50 transition-colors shadow-2xs">
          <UserPlus className="w-3.5 h-3.5 text-zinc-600" />
          <span>Invitar</span>
        </button>

      </div>

    </header>
  )
}
