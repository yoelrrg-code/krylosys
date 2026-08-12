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
  MessageSquareQuote,
  X,
} from 'lucide-react'

interface AdminSidebarProps {
  currentUser?: { email?: string; name?: string; role?: string } | null
  isOpen?: boolean
  onClose?: () => void
}

export function AdminSidebar({ currentUser, isOpen = true, onClose }: AdminSidebarProps) {
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

  const handleNavClick = () => {
    onClose?.()
  }

  const sidebarContent = (
    <div className="w-64 min-w-[16rem] flex flex-col h-full">
      {/* Top Workspace Header */}
      <div className="p-3 flex items-center justify-between gap-2">
        <div className="flex-1 flex items-center justify-between p-2.5 rounded-lg bg-[#0D1322] border border-slate-800 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 flex items-center justify-center font-black text-sm shadow-sm shadow-cyan-500/20">
              K
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-100 leading-tight">Krylosys</span>
              <span className="text-[11px] text-cyan-400 font-medium">Panel Admin</span>
            </div>
          </div>
        </div>
        {/* Close button — mobile only */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden ml-1 w-8 h-8 flex items-center justify-center rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors flex-shrink-0"
            aria-label="Cerrar menú"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Items (Scrollable) */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">

        {/* Collections Section */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Colecciones
          </div>
          {mainNav.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleNavClick}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 font-bold border-l-2 border-cyan-500 pl-2.5'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>

        {/* Globals Section */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Secciones del Sitio
          </div>
          {globalNav.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleNavClick}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 font-bold border-l-2 border-cyan-500 pl-2.5'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>

      </div>

      {/* Footer Profile Section */}
      <div className="p-3 border-t border-slate-800 space-y-2 bg-[#0B0F19]">

        <Link
          href="/"
          target="_blank"
          onClick={handleNavClick}
          className="flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium text-slate-400 hover:bg-slate-800/60 hover:text-slate-100 transition-colors"
        >
          <LifeBuoy className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <span>Ver Sitio Web</span>
        </Link>

        <div className="w-full flex items-center justify-between p-2 rounded-lg bg-[#0D1322] border border-slate-800">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 flex items-center justify-center text-xs font-bold shadow-sm flex-shrink-0">
              {userInitial}
            </div>
            <div className="flex flex-col text-left min-w-0">
              <span className="text-xs font-bold text-slate-100 leading-tight truncate max-w-[130px]" title={userName}>
                {userName}
              </span>
              <span className="text-[11px] text-slate-400 truncate max-w-[130px]" title={userEmail}>
                {userEmail}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )

  return (
    <>
      {/* ── Desktop sidebar: always visible, fixed at left ─── */}
      <aside
        className={`hidden lg:flex h-screen sticky top-0 select-none bg-[#0B0F19] flex-col transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen
            ? 'w-64 opacity-100 border-r border-slate-800'
            : 'w-0 opacity-0 border-r-0 border-transparent pointer-events-none'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* ── Mobile sidebar: drawer overlay ─────────────────── */}
      {/* Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Drawer panel */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 select-none bg-[#0B0F19] border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  )
}
