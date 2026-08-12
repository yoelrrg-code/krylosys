'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Users as UsersIcon,
  Sparkles,
  Info,
  Layers,
  FolderKanban,
  MessageSquareQuote,
  Phone,
  Wrench,
  HelpCircle
} from 'lucide-react'
import { getDashboardStats } from './actions'

export default function CustomDashboardPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statsData, setStatsData] = useState({ services: 4, projects: 4, faqs: 5, users: 1 })

  useEffect(() => {
    getDashboardStats().then((data) => {
      setStatsData(data)
    })
  }, [])

  const stats = [
    { title: 'Usuarios Registrados', value: `${statsData.users}`, sub: 'Administradores y editores del CMS', icon: UsersIcon, href: '/admin/collections/users' },
    { title: 'Servicios en Catálogo', value: `${statsData.services}`, sub: 'Soluciones y paquetes activos', icon: Wrench, href: '/admin/collections/services' },
    { title: 'Proyectos en Portafolio', value: `${statsData.projects}`, sub: 'Casos de éxito publicados', icon: FolderKanban, href: '/admin/collections/projects' },
    { title: 'Preguntas Frecuentes', value: `${statsData.faqs}`, sub: 'FAQs en la base de conocimientos', icon: HelpCircle, href: '/admin/collections/faqs' },
  ]

  const quickLinks = [
    { title: 'Sección Hero', href: '/admin/globals/hero-section', desc: 'Título, subtítulo y botones de acción principal', category: 'Global', icon: Sparkles },
    { title: 'Sección Nosotros', href: '/admin/globals/about-section', desc: 'Tarjetas estilo bento y métricas de éxito', category: 'Global', icon: Info },
    { title: 'Config. Servicios', href: '/admin/globals/services-section', desc: 'Encabezado e introducción del catálogo', category: 'Global', icon: Layers },
    { title: 'Config. Proyectos', href: '/admin/globals/projects-section', desc: 'Texto e introducción del portafolio', category: 'Global', icon: FolderKanban },
    { title: 'Sección FAQ', href: '/admin/globals/faq-section', desc: 'Título y texto del módulo de preguntas', category: 'Global', icon: MessageSquareQuote },
    { title: 'Contacto & Redes', href: '/admin/globals/contact-info', desc: 'Email, WhatsApp, teléfonos y redes sociales', category: 'Global', icon: Phone },
    { title: 'Lista de Servicios', href: '/admin/collections/services', desc: `Gestiona los ${statsData.services} servicios activos`, category: 'Colección', icon: Wrench },
    { title: 'Lista de Proyectos', href: '/admin/collections/projects', desc: `Gestiona los ${statsData.projects} proyectos del portafolio`, category: 'Colección', icon: FolderKanban },
    { title: 'Lista de FAQs', href: '/admin/collections/faqs', desc: `Gestiona las ${statsData.faqs} preguntas y respuestas`, category: 'Colección', icon: HelpCircle },
    { title: 'Lista de Usuarios', href: '/admin/collections/users', desc: `Gestiona los ${statsData.users} usuarios del sistema`, category: 'Colección', icon: UsersIcon },
  ]

  const filteredLinks = quickLinks.filter(l =>
    l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.desc.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-slate-100 tracking-tight">
          Panel de Control
        </h1>
      </div>

      {/* 4 Top Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((st) => {
          const Icon = st.icon
          return (
            <Link
              key={st.title}
              href={st.href}
              className="bg-[#0D1322] border border-slate-800 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-950/20 rounded-xl p-5 space-y-2 transition-all block group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-200">{st.title}</span>
                <Icon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-bold text-slate-100 tracking-tight">
                {st.value}
              </div>
              <div className="text-[11px] text-cyan-400 font-medium group-hover:text-cyan-300">
                {st.sub} →
              </div>
            </Link>
          )
        })}
      </div>

      {/* Bottom Section: Content Management Grid */}
      <div className="bg-[#0D1322] border border-slate-800 rounded-xl p-6 space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-slate-100">Módulos de Contenido y Proyectos</h2>
            <p className="text-xs text-slate-400">Edita rápidamente las secciones globales y colecciones del sitio</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="text"
              placeholder="Filtrar módulos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1.5 bg-[#060913] border border-slate-800 rounded-md text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 min-w-[200px]"
            />
          </div>
        </div>

        {/* Content Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className="p-4 bg-[#0B0F19] hover:bg-slate-800/60 border border-slate-800/80 hover:border-cyan-500/40 rounded-lg transition-all space-y-2 group block"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-xs text-slate-100 group-hover:text-cyan-300">{link.title}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    link.category === 'Global'
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  }`}>
                    {link.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{link.desc}</p>
              </Link>
            )
          })}
        </div>

      </div>

    </div>
  )
}
