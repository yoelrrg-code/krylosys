'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Wrench,
  HelpCircle,
  LifeBuoy,
  Layers,
  Sparkles,
  Info,
  Phone,
  MessageSquareQuote
} from 'lucide-react'

interface AdminSidebarProps {
  currentUser?: { email?: string; name?: string; role?: string } | null
  isOpen?: boolean
}

export function AdminSidebar({ currentUser, isOpen = true }: AdminSidebarProps) {
  const pathname = usePathname()

  const userName = currentUser?.name || 'Yoelkys R Rodriguez Gonzalez'
  const userEmail = currentUser?.email || 'yoelkys.rrg@gmail.com'
  const userInitial = userName.charAt(0).toUpperCase() || 'Y'

  const mainNav = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Clientes & Usuarios', href: '/admin/collections/users', icon: Users },
    { name: 'Gestión de Proyectos', href: '/admin/collections/projects', icon: FolderKanban },
    { name: 'Servicios', href: '/admin/collections/services', icon: Wrench },
    { name: 'Preguntas FAQ', href: '/admin/collections/faqs', icon: HelpCircle },
  ]

  const globalNav = [
    { name: 'Sección Hero', href: '/admin/globals/hero-section', icon: Sparkles },
    { name: 'Sección Nosotros', href: '/admin/globals/about-section', icon: Info },
    { name: 'Sección Servicios', href: '/admin/globals/services-section', icon: Layers },
    { name: 'Sección Proyectos', href: '/admin/globals/projects-section', icon: FolderKanban },
    { name: 'Sección FAQ', href: '/admin/globals/faq-section', icon: MessageSquareQuote },
    { name: 'Contacto & Redes', href: '/admin/globals/contact-info', icon: Phone },
  ]

  return (
    <aside
      className={`h-screen sticky top-0 select-none bg-zinc-50/50 flex flex-col transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen
          ? 'w-64 opacity-100 border-r border-zinc-200'
          : 'w-0 opacity-0 border-r-0 border-transparent pointer-events-none'
      }`}
    >
      <div className="w-64 min-w-[16rem] flex flex-col h-full">
      
      {/* Top Workspace Header */}
      <div className="p-3">
        <div className="w-full flex items-center justify-between p-2 rounded-lg bg-white border border-zinc-200 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-zinc-900 text-white flex items-center justify-center font-bold text-sm">
              K
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-zinc-900 leading-tight">Krylosys</span>
              <span className="text-[11px] text-zinc-500 font-medium">Panel Admin</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Items (Scrollable) */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
        
        {/* Main Section */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            Colecciones
          </div>
          {mainNav.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-zinc-200/70 text-zinc-900 font-semibold'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-zinc-900' : 'text-zinc-500'}`} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>

        {/* Globals Section */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            Secciones del Sitio
          </div>
          {globalNav.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-zinc-200/70 text-zinc-900 font-semibold'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-zinc-900' : 'text-zinc-500'}`} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>

      </div>

      {/* Footer Profile Section */}
      <div className="p-3 border-t border-zinc-200 space-y-2 bg-zinc-50">
        
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
        >
          <LifeBuoy className="w-4 h-4 text-zinc-500" />
          <span>Ver Sitio Web</span>
        </Link>

        <div className="w-full flex items-center justify-between p-2 rounded-lg bg-white border border-zinc-200 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-bold">
              {userInitial}
            </div>
            <div className="flex flex-col text-left overflow-hidden">
              <span className="text-xs font-bold text-zinc-900 leading-tight truncate max-w-[130px]" title={userName}>
                {userName}
              </span>
              <span className="text-[11px] text-zinc-500 truncate max-w-[130px]" title={userEmail}>
                {userEmail}
              </span>
            </div>
          </div>
        </div>

      </div>

      </div>

    </aside>
  )
}
