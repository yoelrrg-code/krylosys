'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Calendar as CalendarIcon,
  Download,
  DollarSign,
  Users as UsersIcon,
  CreditCard,
  Activity,
  Plus,
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
  const [activeTab, setActiveTab] = useState<'Vista General' | 'Analítica' | 'Reportes' | 'Notificaciones'>('Vista General')
  const [searchTerm, setSearchTerm] = useState('')
  const [statsData, setStatsData] = useState({ services: 4, projects: 4, faqs: 5, users: 1 })

  useEffect(() => {
    getDashboardStats().then((data) => {
      setStatsData(data)
    })
  }, [])

  const stats = [
    { title: 'Ingresos Totales', value: '$45,231.89', sub: '+20.1% respecto al mes pasado', icon: DollarSign },
    { title: 'Suscripciones', value: `+${statsData.users * 2350 || 2350}`, sub: '+180.1% respecto al mes pasado', icon: UsersIcon },
    { title: 'Ventas', value: `+${statsData.services * 3058 || 12234}`, sub: '+19% respecto al mes pasado', icon: CreditCard },
    { title: 'Activos Ahora', value: `+${statsData.projects * 143 || 573}`, sub: '+201 respecto al mes pasado', icon: Activity },
  ]

  const barData = [
    { month: 'Ene', height: '65%' },
    { month: 'Feb', height: '45%' },
    { month: 'Mar', height: '25%' },
    { month: 'Abr', height: '50%' },
    { month: 'May', height: '95%' },
    { month: 'Jun', height: '50%' },
    { month: 'Jul', height: '35%' },
    { month: 'Ago', height: '60%' },
    { month: 'Sep', height: '20%' },
    { month: 'Oct', height: '20%' },
    { month: 'Nov', height: '70%' },
    { month: 'Dic', height: '35%' },
  ]

  const leads = [
    { name: 'Prospectos', count: '286', pct: '83%', width: '83%' },
    { name: 'Calificados', count: '286', pct: '83%', width: '83%' },
    { name: 'Propuesta', count: '286', pct: '83%', width: '45%' },
    { name: 'Negociación', count: '286', pct: '83%', width: '60%' },
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
        <h1 className="text-3xl font-bold text-zinc-950 tracking-tight">
          Panel de Control
        </h1>

        <div className="flex items-center gap-3">
          {/* Date Picker Button Pill */}
          <div className="inline-flex items-center gap-2 bg-white border border-zinc-200 rounded-md px-3 py-1.5 text-xs font-medium text-zinc-900 shadow-2xs">
            <CalendarIcon className="w-3.5 h-3.5 text-zinc-500" />
            <span>17 Oct, 2024 - 6 Nov, 2024</span>
          </div>

          {/* Download Button */}
          <button className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white font-medium px-3.5 py-1.5 rounded-md text-xs shadow-2xs transition-colors">
            <Download className="w-3.5 h-3.5" />
            <span>Descargar Reporte</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="inline-flex items-center bg-zinc-100 p-1 rounded-lg gap-1 border border-zinc-200/50">
        {(['Vista General', 'Analítica', 'Reportes', 'Notificaciones'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${
              activeTab === tab
                ? 'bg-white text-zinc-950 shadow-2xs font-semibold'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 4 Top Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((st) => {
          const Icon = st.icon
          return (
            <div
              key={st.title}
              className="bg-white border border-zinc-200 rounded-xl p-5 shadow-2xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-500">{st.title}</span>
                <Icon className="w-4 h-4 text-zinc-400" />
              </div>
              <div className="text-2xl font-bold text-zinc-950 tracking-tight">
                {st.value}
              </div>
              <div className="text-[11px] text-zinc-500 font-normal">
                {st.sub}
              </div>
            </div>
          )
        })}
      </div>

      {/* Middle Row: Overview Bar Chart & Right Column Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Overview Bar Chart Card (Spans 2 cols on desktop) */}
        <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-xl p-6 shadow-2xs flex flex-col justify-between min-h-[340px]">
          <h2 className="text-base font-semibold text-zinc-950 mb-4">Vista General</h2>

          {/* Bar chart representation */}
          <div className="flex items-end justify-between h-52 gap-2 pt-4">
            {barData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center h-full justify-end group">
                <div
                  style={{ height: d.height }}
                  className="w-full max-w-[32px] bg-zinc-950 rounded-t-md group-hover:bg-zinc-800 transition-all"
                />
                <span className="text-[11px] text-zinc-500 font-medium mt-3">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Leads-to-clients & To-do lists */}
        <div className="space-y-6">
          
          {/* Leads-to-clients Card */}
          <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-2xs space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-semibold text-zinc-950">Conversión de Clientes</h3>
                <p className="text-[11px] text-zinc-500">Seguimiento de prospectos y ventas.</p>
              </div>
              <button className="px-2.5 py-1 border border-zinc-200 rounded-md text-[11px] font-medium text-zinc-900 hover:bg-zinc-50 transition-colors">
                Ver todos
              </button>
            </div>

            <div className="space-y-3">
              {leads.map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-zinc-900">{item.name}</span>
                    <span className="text-zinc-500">{item.count} <strong className="text-zinc-900">({item.pct})</strong></span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                    <div style={{ width: item.width }} className="h-full bg-zinc-950 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* To-do lists Card */}
          <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-2xs space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-zinc-950">Tareas Pendientes</h3>
              <p className="text-[11px] text-zinc-500">Mantenimiento y estado del sistema.</p>
            </div>

            <div className="space-y-3">
              {[
                { title: 'Servicios Esenciales', desc: 'Mantenimiento de infraestructura y API.' },
                { title: 'Respaldo de Datos', desc: 'Copias de seguridad automáticas.' },
                { title: 'Optimización de Carga', desc: 'Rendimiento y velocidad de respuesta.' },
              ].map((sw, i) => (
                <div key={sw.title} className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold text-zinc-900">{sw.title}</div>
                    <div className="text-[10px] text-zinc-500 leading-tight">{sw.desc}</div>
                  </div>
                  {/* Switch Pill */}
                  <div className={`w-9 h-5 rounded-full relative cursor-pointer flex-shrink-0 transition-colors ${i < 2 ? 'bg-zinc-950' : 'bg-zinc-200'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${i < 2 ? 'left-4' : 'left-0.5'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Section: Recent Project & Content Management Grid */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-2xs space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-zinc-950">Módulos de Contenido y Proyectos</h2>
            <p className="text-xs text-zinc-500">Edita rápidamente las secciones globales y colecciones del sitio</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="text"
              placeholder="Filtrar módulos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1.5 bg-white border border-zinc-200 rounded-md text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 min-w-[180px]"
            />
            <button className="flex items-center gap-1 px-3 py-1.5 border border-zinc-200 rounded-md text-xs font-medium text-zinc-900 hover:bg-zinc-50 transition-colors">
              <Plus className="w-3.5 h-3.5 text-zinc-500" />
              <span>Estado</span>
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 border border-zinc-200 rounded-md text-xs font-medium text-zinc-900 hover:bg-zinc-50 transition-colors">
              <Plus className="w-3.5 h-3.5 text-zinc-500" />
              <span>Prioridad</span>
            </button>
            <button className="px-3 py-1.5 border border-zinc-200 rounded-md text-xs font-medium text-zinc-900 hover:bg-zinc-50 transition-colors">
              Ver
            </button>
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
                className="p-4 bg-zinc-50/50 hover:bg-zinc-100/80 border border-zinc-200 rounded-lg transition-all space-y-1.5 group block"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-zinc-600 group-hover:text-zinc-950" />
                    <span className="font-semibold text-xs text-zinc-900 group-hover:text-zinc-950">{link.title}</span>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                    link.category === 'Global' ? 'bg-zinc-900 text-white' : 'bg-zinc-200 text-zinc-800'
                  }`}>
                    {link.category}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-normal">{link.desc}</p>
              </Link>
            )
          })}
        </div>

      </div>

    </div>
  )
}
