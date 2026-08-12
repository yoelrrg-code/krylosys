'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import {
  Search,
  Plus,
  Filter,
  Columns,
  Trash2,
  Edit,
  X,
  ChevronDown,
  Loader2,
  AlertTriangle
} from 'lucide-react'
import { sileo } from 'sileo'
import {
  getCollectionItems,
  createCollectionItem,
  updateCollectionItem,
  deleteCollectionItem
} from '../../actions'
import { useAuth } from '@/components/admin/auth-provider'

interface CollectionItem {
  id?: string | number
  email?: string
  name?: string
  fullName?: string
  role?: string
  title?: string
  category?: string
  icon?: string
  subtitle?: string
  question?: string
  answer?: string
  order?: number
  updatedAt?: string
  [key: string]: unknown
}

const COLLECTION_TITLES: Record<string, string> = {
  users: 'Usuarios',
  projects: 'Proyectos',
  services: 'Servicios',
  faqs: 'Preguntas Frecuentes',
}

const FIELD_LABELS: Record<string, string> = {
  title: 'Título',
  headline: 'Título Destacado (Headline)',
  subtitle: 'Subtítulo',
  name: 'Nombre Completo',
  email: 'Correo Electrónico',
  role: 'Rol de Usuario',
  password: 'Contraseña',
  category: 'Categoría',
  description: 'Descripción',
  metrics: 'Métrica de Éxito',
  tags: 'Etiquetas Tecnológicas',
  demoUrl: 'Enlace a la Demostración',
  badge: 'Insignia (Badge)',
  badgeText: 'Texto de la Insignia',
  ctaText: 'Texto Botón Principal (CTA)',
  ctaLink: 'Enlace Botón Principal (CTA)',
  ctaPrimaryText: 'Texto Botón Principal (CTA)',
  ctaPrimaryLink: 'Enlace Botón Principal (CTA)',
  ctaSecondaryText: 'Texto Botón Secundario (CTA)',
  ctaSecondaryLink: 'Enlace Botón Secundario (CTA)',
  score: 'Métrica / Score',
  highlight: 'Destacar en Portada',
  features: 'Características Principales',
  whatsappMsg: 'Mensaje Predeterminado de WhatsApp',
  question: 'Pregunta Frecuente',
  answer: 'Respuesta',
  order: 'Orden de Aparición',
}

function getCollectionTitle(slug: string): string {
  return COLLECTION_TITLES[slug] || slug
}

function getFieldLabel(key: string): string {
  return FIELD_LABELS[key] || key
}

export default function CollectionListPage() {
  const params = useParams()
  const slug = (params.slug as string) || 'users'
  const { user: currentUser } = useAuth()

  const [items, setItems] = useState<CollectionItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterValue, setFilterValue] = useState<string>('all')
  const [columnsOpen, setColumnsOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const columnsRef = React.useRef<HTMLDivElement>(null)
  const filtersRef = React.useRef<HTMLDivElement>(null)

  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    id: true,
    email: true,
    name: true,
    role: true,
    title: true,
    badge: true,
    score: true,
    highlight: true,
    category: true,
    metrics: true,
    question: true,
    order: true,
    updatedAt: true,
    actions: true,
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<CollectionItem | null>(null)
  const [formData, setFormData] = useState<Record<string, unknown>>({})
  const [submitting, setSubmitting] = useState(false)

  const toggleColumn = (key: string) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (columnsRef.current && !columnsRef.current.contains(event.target as Node)) {
        setColumnsOpen(false)
      }
      if (filtersRef.current && !filtersRef.current.contains(event.target as Node)) {
        setFiltersOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const loadData = useCallback(async () => {
    setLoading(true)
    const res = await getCollectionItems(slug)
    if (res.success) {
      setItems(res.docs || [])
    }
    setLoading(false)
  }, [slug])

  useEffect(() => {
    let isSubscribed = true
    getCollectionItems(slug).then((res) => {
      if (isSubscribed) {
        if (res.success) {
          setItems(res.docs || [])
        }
        setLoading(false)
      }
    })
    return () => {
      isSubscribed = false
    }
  }, [slug])

  const filteredItems = items.filter((item) => {
    const matchesSearch = JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
    if (!matchesSearch) return false

    if (filterValue === 'all') return true

    if (slug === 'users') {
      return (item.role || 'admin') === filterValue
    } else if (slug === 'services') {
      if (filterValue === 'highlighted') return Boolean(item.highlight)
      if (filterValue === 'standard') return !item.highlight
    } else if (slug === 'projects') {
      return String(item.category || '') === filterValue
    }

    return true
  })

  const handleOpenCreate = () => {
    setEditingItem(null)
    if (slug === 'services') {
      setFormData({ title: '', badge: '', score: '', description: '', highlight: false, features: '', whatsappMsg: '' })
    } else if (slug === 'projects') {
      setFormData({ title: '', category: 'custom', description: '', metrics: '', tags: '', demoUrl: '' })
    } else if (slug === 'faqs') {
      setFormData({ question: '', answer: '', order: 0 })
    } else if (slug === 'users') {
      setFormData({ email: '', name: '', role: 'admin', password: '' })
    } else {
      setFormData({})
    }
    setIsModalOpen(true)
  }

  const handleOpenEdit = (item: CollectionItem) => {
    setEditingItem(item)
    const formatted: Record<string, unknown> = { ...item }

    if (Array.isArray(formatted.tags)) {
      formatted.tags = formatted.tags
        .map((t: unknown) => (typeof t === 'object' && t !== null && 'tag' in t ? (t as { tag: string }).tag : String(t)))
        .join(', ')
    }
    if (Array.isArray(formatted.features)) {
      formatted.features = formatted.features
        .map((f: unknown) => (typeof f === 'object' && f !== null && 'feature' in f ? (f as { feature: string }).feature : String(f)))
        .join(', ')
    }

    setFormData(formatted)
    setIsModalOpen(true)
  }

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | number | null>(null)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = (id: string | number, email?: string) => {
    if (slug === 'users' && currentUser?.email && email === currentUser.email) {
      sileo.warning({
        title: 'Acción Bloqueada',
        description: 'No podés eliminar tu propia cuenta de usuario.',
      })
      return
    }
    setDeleteConfirmId(id)
  }

  const executeDelete = async () => {
    if (deleteConfirmId === null) return
    setDeleting(true)
    const res = await deleteCollectionItem(slug, deleteConfirmId)
    setDeleting(false)
    setDeleteConfirmId(null)

    if (res && res.success) {
      sileo.success({
        title: 'Registro Eliminado',
        description: 'El elemento se eliminó correctamente.',
      })
      await loadData()
    } else {
      sileo.error({
        title: 'Error al Eliminar',
        description: res?.error || 'No se pudo eliminar el registro.',
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const payload = { ...formData }

    if (typeof payload.tags === 'string') {
      payload.tags = payload.tags
        .split(',')
        .map((t) => ({ tag: t.trim() }))
        .filter((t) => t.tag.length > 0)
    }

    if (typeof payload.features === 'string') {
      payload.features = payload.features
        .split(',')
        .map((f) => ({ feature: f.trim() }))
        .filter((f) => f.feature.length > 0)
    }

    if (editingItem && editingItem.id !== undefined) {
      const res = await updateCollectionItem(slug, editingItem.id, payload)
      if (res.success) {
        sileo.success({
          title: 'Registro Actualizado',
          description: 'Los cambios fueron guardados exitosamente.',
        })
      } else {
        sileo.error({
          title: 'Error al Guardar',
          description: res.error || 'No se pudo actualizar el registro.',
        })
      }
    } else {
      const res = await createCollectionItem(slug, payload)
      if (res.success) {
        sileo.success({
          title: 'Registro Creado',
          description: 'El elemento fue creado exitosamente.',
        })
      } else {
        sileo.error({
          title: 'Error al Crear',
          description: res.error || 'No se pudo crear el registro.',
        })
      }
    }
    setSubmitting(false)
    setIsModalOpen(false)
    await loadData()
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto select-none">
      
      {/* Breadcrumb */}
      <div className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
        <span>Admin</span>
        <span>/</span>
        <span className="text-slate-100 font-semibold">{getCollectionTitle(slug)}</span>
      </div>

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight">
            {getCollectionTitle(slug)}
          </h1>
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold px-3.5 py-1.5 rounded-md text-xs shadow-md shadow-cyan-500/10 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Crear Nuevo</span>
          </button>
        </div>
      </div>

      {/* Filter & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0D1322] p-3 border border-slate-800 rounded-xl">
        
        <div className="relative flex items-center flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder={`Buscar por ${slug === 'users' ? 'email o nombre' : 'título'}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-[#060913] border border-slate-800 rounded-md text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          
          {/* Columnas Dropdown */}
          <div className="relative" ref={columnsRef}>
            <button
              onClick={() => {
                setColumnsOpen((prev) => !prev)
                setFiltersOpen(false)
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-md text-xs font-medium transition-colors ${
                columnsOpen
                  ? 'bg-slate-800 border-cyan-500/50 text-cyan-400'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
              }`}
            >
              <Columns className="w-3.5 h-3.5 text-slate-400" />
              <span>Columnas</span>
              <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${columnsOpen ? 'rotate-180 text-cyan-400' : ''}`} />
            </button>

            {columnsOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#0D1322] border border-slate-800 rounded-xl shadow-2xl p-3 z-40 space-y-2 animate-in fade-in duration-150 text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-slate-200">Visibilidad de Columnas</span>
                  <button
                    onClick={() => {
                      setVisibleColumns({
                        id: true, email: true, name: true, role: true,
                        title: true, badge: true, score: true, highlight: true,
                        category: true, metrics: true, question: true, order: true,
                        updatedAt: true, actions: true,
                      })
                    }}
                    className="text-[10px] text-cyan-400 hover:underline"
                  >
                    Mostrar Todas
                  </button>
                </div>

                <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                  {slug === 'users' && (
                    <>
                      <label className="flex items-center gap-2 text-slate-300 hover:text-slate-100 cursor-pointer py-1">
                        <input type="checkbox" checked={visibleColumns.id !== false} onChange={() => toggleColumn('id')} className="rounded border-slate-700 bg-[#060913] text-cyan-500" />
                        <span># ID</span>
                      </label>
                      <label className="flex items-center gap-2 text-slate-300 hover:text-slate-100 cursor-pointer py-1">
                        <input type="checkbox" checked={visibleColumns.email !== false} onChange={() => toggleColumn('email')} className="rounded border-slate-700 bg-[#060913] text-cyan-500" />
                        <span>Email</span>
                      </label>
                      <label className="flex items-center gap-2 text-slate-300 hover:text-slate-100 cursor-pointer py-1">
                        <input type="checkbox" checked={visibleColumns.name !== false} onChange={() => toggleColumn('name')} className="rounded border-slate-700 bg-[#060913] text-cyan-500" />
                        <span>Nombre Completo</span>
                      </label>
                      <label className="flex items-center gap-2 text-slate-300 hover:text-slate-100 cursor-pointer py-1">
                        <input type="checkbox" checked={visibleColumns.role !== false} onChange={() => toggleColumn('role')} className="rounded border-slate-700 bg-[#060913] text-cyan-500" />
                        <span>Rol</span>
                      </label>
                    </>
                  )}

                  {slug === 'services' && (
                    <>
                      <label className="flex items-center gap-2 text-slate-300 hover:text-slate-100 cursor-pointer py-1">
                        <input type="checkbox" checked={visibleColumns.id !== false} onChange={() => toggleColumn('id')} className="rounded border-slate-700 bg-[#060913] text-cyan-500" />
                        <span># ID</span>
                      </label>
                      <label className="flex items-center gap-2 text-slate-300 hover:text-slate-100 cursor-pointer py-1">
                        <input type="checkbox" checked={visibleColumns.title !== false} onChange={() => toggleColumn('title')} className="rounded border-slate-700 bg-[#060913] text-cyan-500" />
                        <span>Título</span>
                      </label>
                      <label className="flex items-center gap-2 text-slate-300 hover:text-slate-100 cursor-pointer py-1">
                        <input type="checkbox" checked={visibleColumns.badge !== false} onChange={() => toggleColumn('badge')} className="rounded border-slate-700 bg-[#060913] text-cyan-500" />
                        <span>Insignia (Badge)</span>
                      </label>
                      <label className="flex items-center gap-2 text-slate-300 hover:text-slate-100 cursor-pointer py-1">
                        <input type="checkbox" checked={visibleColumns.score !== false} onChange={() => toggleColumn('score')} className="rounded border-slate-700 bg-[#060913] text-cyan-500" />
                        <span>Métrica / Score</span>
                      </label>
                      <label className="flex items-center gap-2 text-slate-300 hover:text-slate-100 cursor-pointer py-1">
                        <input type="checkbox" checked={visibleColumns.highlight !== false} onChange={() => toggleColumn('highlight')} className="rounded border-slate-700 bg-[#060913] text-cyan-500" />
                        <span>Portada</span>
                      </label>
                    </>
                  )}

                  {slug === 'projects' && (
                    <>
                      <label className="flex items-center gap-2 text-slate-300 hover:text-slate-100 cursor-pointer py-1">
                        <input type="checkbox" checked={visibleColumns.id !== false} onChange={() => toggleColumn('id')} className="rounded border-slate-700 bg-[#060913] text-cyan-500" />
                        <span># ID</span>
                      </label>
                      <label className="flex items-center gap-2 text-slate-300 hover:text-slate-100 cursor-pointer py-1">
                        <input type="checkbox" checked={visibleColumns.title !== false} onChange={() => toggleColumn('title')} className="rounded border-slate-700 bg-[#060913] text-cyan-500" />
                        <span>Título</span>
                      </label>
                      <label className="flex items-center gap-2 text-slate-300 hover:text-slate-100 cursor-pointer py-1">
                        <input type="checkbox" checked={visibleColumns.category !== false} onChange={() => toggleColumn('category')} className="rounded border-slate-700 bg-[#060913] text-cyan-500" />
                        <span>Categoría</span>
                      </label>
                      <label className="flex items-center gap-2 text-slate-300 hover:text-slate-100 cursor-pointer py-1">
                        <input type="checkbox" checked={visibleColumns.metrics !== false} onChange={() => toggleColumn('metrics')} className="rounded border-slate-700 bg-[#060913] text-cyan-500" />
                        <span>Métrica</span>
                      </label>
                    </>
                  )}

                  {slug === 'faqs' && (
                    <>
                      <label className="flex items-center gap-2 text-slate-300 hover:text-slate-100 cursor-pointer py-1">
                        <input type="checkbox" checked={visibleColumns.id !== false} onChange={() => toggleColumn('id')} className="rounded border-slate-700 bg-[#060913] text-cyan-500" />
                        <span># ID</span>
                      </label>
                      <label className="flex items-center gap-2 text-slate-300 hover:text-slate-100 cursor-pointer py-1">
                        <input type="checkbox" checked={visibleColumns.question !== false} onChange={() => toggleColumn('question')} className="rounded border-slate-700 bg-[#060913] text-cyan-500" />
                        <span>Pregunta</span>
                      </label>
                      <label className="flex items-center gap-2 text-slate-300 hover:text-slate-100 cursor-pointer py-1">
                        <input type="checkbox" checked={visibleColumns.order !== false} onChange={() => toggleColumn('order')} className="rounded border-slate-700 bg-[#060913] text-cyan-500" />
                        <span>Orden</span>
                      </label>
                    </>
                  )}

                  <label className="flex items-center gap-2 text-slate-300 hover:text-slate-100 cursor-pointer py-1 border-t border-slate-800/60 pt-1.5 mt-1">
                    <input type="checkbox" checked={visibleColumns.updatedAt !== false} onChange={() => toggleColumn('updatedAt')} className="rounded border-slate-700 bg-[#060913] text-cyan-500" />
                    <span>Actualizado</span>
                  </label>
                  <label className="flex items-center gap-2 text-slate-300 hover:text-slate-100 cursor-pointer py-1">
                    <input type="checkbox" checked={visibleColumns.actions !== false} onChange={() => toggleColumn('actions')} className="rounded border-slate-700 bg-[#060913] text-cyan-500" />
                    <span>Acciones</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Filtros Dropdown */}
          <div className="relative" ref={filtersRef}>
            <button
              onClick={() => {
                setFiltersOpen((prev) => !prev)
                setColumnsOpen(false)
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-md text-xs font-medium transition-colors ${
                filterValue !== 'all' || filtersOpen
                  ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
              }`}
            >
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>{filterValue !== 'all' ? `Filtro Activo` : 'Filtros'}</span>
              <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${filtersOpen ? 'rotate-180 text-cyan-400' : ''}`} />
            </button>

            {filtersOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#0D1322] border border-slate-800 rounded-xl shadow-2xl p-3 z-40 space-y-2 animate-in fade-in duration-150 text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-slate-200">Filtrar por Criterio</span>
                  {filterValue !== 'all' && (
                    <button
                      onClick={() => setFilterValue('all')}
                      className="text-[10px] text-cyan-400 hover:underline"
                    >
                      Limpiar
                    </button>
                  )}
                </div>

                <div className="space-y-1">
                  {slug === 'users' && (
                    <>
                      <button
                        onClick={() => { setFilterValue('all'); setFiltersOpen(false) }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-md ${filterValue === 'all' ? 'bg-cyan-500/10 text-cyan-400 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
                      >
                        Todos los Roles
                      </button>
                      <button
                        onClick={() => { setFilterValue('admin'); setFiltersOpen(false) }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-md ${filterValue === 'admin' ? 'bg-cyan-500/10 text-cyan-400 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
                      >
                        Administradores (admin)
                      </button>
                      <button
                        onClick={() => { setFilterValue('editor'); setFiltersOpen(false) }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-md ${filterValue === 'editor' ? 'bg-cyan-500/10 text-cyan-400 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
                      >
                        Editores (editor)
                      </button>
                    </>
                  )}

                  {slug === 'services' && (
                    <>
                      <button
                        onClick={() => { setFilterValue('all'); setFiltersOpen(false) }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-md ${filterValue === 'all' ? 'bg-cyan-500/10 text-cyan-400 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
                      >
                        Todos los Servicios
                      </button>
                      <button
                        onClick={() => { setFilterValue('highlighted'); setFiltersOpen(false) }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-md ${filterValue === 'highlighted' ? 'bg-cyan-500/10 text-cyan-400 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
                      >
                        Solo Destacados
                      </button>
                      <button
                        onClick={() => { setFilterValue('standard'); setFiltersOpen(false) }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-md ${filterValue === 'standard' ? 'bg-cyan-500/10 text-cyan-400 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
                      >
                        Solo Estándar
                      </button>
                    </>
                  )}

                  {slug === 'projects' && (
                    <>
                      <button
                        onClick={() => { setFilterValue('all'); setFiltersOpen(false) }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-md ${filterValue === 'all' ? 'bg-cyan-500/10 text-cyan-400 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
                      >
                        Todas las Categorías
                      </button>
                      <button
                        onClick={() => { setFilterValue('nextjs'); setFiltersOpen(false) }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-md ${filterValue === 'nextjs' ? 'bg-cyan-500/10 text-cyan-400 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
                      >
                        Next.js & React
                      </button>
                      <button
                        onClick={() => { setFilterValue('wordpress'); setFiltersOpen(false) }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-md ${filterValue === 'wordpress' ? 'bg-cyan-500/10 text-cyan-400 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
                      >
                        WordPress
                      </button>
                      <button
                        onClick={() => { setFilterValue('woocommerce'); setFiltersOpen(false) }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-md ${filterValue === 'woocommerce' ? 'bg-cyan-500/10 text-cyan-400 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
                      >
                        WooCommerce
                      </button>
                      <button
                        onClick={() => { setFilterValue('custom'); setFiltersOpen(false) }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-md ${filterValue === 'custom' ? 'bg-cyan-500/10 text-cyan-400 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
                      >
                        Software a Medida
                      </button>
                    </>
                  )}

                  {slug === 'faqs' && (
                    <p className="text-slate-400 text-[11px] p-2">Todos los registros activos.</p>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Data Table */}
      <div className="bg-[#0D1322] border border-slate-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
            <span className="text-xs font-medium">Cargando datos de la colección...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            No se encontraron registros que coincidan con la búsqueda o filtro aplicado.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0B0F19] border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  {visibleColumns.id !== false && <th className="p-3.5 pl-5"># ID</th>}
                  {slug === 'users' && (
                    <>
                      {visibleColumns.email !== false && <th className="p-3.5">Email</th>}
                      {visibleColumns.name !== false && <th className="p-3.5">Nombre Completo</th>}
                      {visibleColumns.role !== false && <th className="p-3.5">Rol</th>}
                    </>
                  )}
                  {slug === 'services' && (
                    <>
                      {visibleColumns.title !== false && <th className="p-3.5">Título</th>}
                      {visibleColumns.badge !== false && <th className="p-3.5">Insignia (Badge)</th>}
                      {visibleColumns.score !== false && <th className="p-3.5">Métrica / Score</th>}
                      {visibleColumns.highlight !== false && <th className="p-3.5">Portada</th>}
                    </>
                  )}
                  {slug === 'projects' && (
                    <>
                      {visibleColumns.title !== false && <th className="p-3.5">Título</th>}
                      {visibleColumns.category !== false && <th className="p-3.5">Categoría</th>}
                      {visibleColumns.metrics !== false && <th className="p-3.5">Métrica</th>}
                    </>
                  )}
                  {slug === 'faqs' && (
                    <>
                      {visibleColumns.question !== false && <th className="p-3.5">Pregunta</th>}
                      {visibleColumns.order !== false && <th className="p-3.5">Orden</th>}
                    </>
                  )}
                  {visibleColumns.updatedAt !== false && <th className="p-3.5">Actualizado</th>}
                  {visibleColumns.actions !== false && <th className="p-3.5 text-right pr-5">Acciones</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {filteredItems.map((item) => {
                  const isSelf = slug === 'users' && Boolean(currentUser?.email && item.email === currentUser.email)
                  return (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      {visibleColumns.id !== false && <td className="p-3.5 pl-5 font-mono text-slate-500 text-[11px]">{item.id}</td>}
                      
                      {slug === 'users' && (
                        <>
                          {visibleColumns.email !== false && <td className="p-3.5 font-medium text-slate-100">{item.email}</td>}
                          {visibleColumns.name !== false && <td className="p-3.5 text-slate-300">{item.name || item.fullName || 'Yoelkys - Admin Krylosys'}</td>}
                          {visibleColumns.role !== false && (
                            <td className="p-3.5">
                              <span className="inline-flex px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-bold uppercase">
                                {item.role || 'Administrador'}
                              </span>
                            </td>
                          )}
                        </>
                      )}

                      {slug === 'services' && (
                        <>
                          {visibleColumns.title !== false && <td className="p-3.5 font-semibold text-slate-100">{String(item.title || '')}</td>}
                          {visibleColumns.badge !== false && <td className="p-3.5 text-slate-300 font-medium">{String(item.badge || '')}</td>}
                          {visibleColumns.score !== false && <td className="p-3.5 text-slate-400">{String(item.score || '')}</td>}
                          {visibleColumns.highlight !== false && (
                            <td className="p-3.5">
                              <span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                item.highlight
                                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                  : 'bg-slate-800 text-slate-400'
                              }`}>
                                {item.highlight ? 'Destacado' : 'Estándar'}
                              </span>
                            </td>
                          )}
                        </>
                      )}

                      {slug === 'projects' && (
                        <>
                          {visibleColumns.title !== false && <td className="p-3.5 font-semibold text-slate-100">{String(item.title || '')}</td>}
                          {visibleColumns.category !== false && (
                            <td className="p-3.5">
                              <span className="inline-flex px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-bold uppercase">
                                {String(item.category || '')}
                              </span>
                            </td>
                          )}
                          {visibleColumns.metrics !== false && <td className="p-3.5 text-slate-400">{String(item.metrics || '')}</td>}
                        </>
                      )}

                      {slug === 'faqs' && (
                        <>
                          {visibleColumns.question !== false && <td className="p-3.5 font-semibold text-slate-100">{item.question}</td>}
                          {visibleColumns.order !== false && <td className="p-3.5 font-medium text-slate-400">{item.order}</td>}
                        </>
                      )}

                      {visibleColumns.updatedAt !== false && (
                        <td className="p-3.5 text-slate-500 text-[11px]">
                          {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : 'Reciente'}
                        </td>
                      )}

                      {visibleColumns.actions !== false && (
                        <td className="p-3.5 text-right pr-5 space-x-2">
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-1.5 rounded-md border border-slate-800 bg-slate-900 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-800 transition-colors"
                            title="Editar"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            disabled={isSelf}
                            onClick={() => !isSelf && item.id !== undefined && handleDelete(item.id, item.email)}
                            className={`p-1.5 rounded-md border transition-colors ${
                              isSelf
                                ? 'border-slate-800/50 bg-slate-900/40 text-slate-600 cursor-not-allowed opacity-40'
                                : 'border-slate-800 bg-slate-900 text-red-400 hover:bg-red-500/10 hover:border-red-500/30'
                            }`}
                            title={isSelf ? 'No podés eliminar tu propia cuenta' : 'Eliminar'}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      )}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1 select-none">
        <span>1-{filteredItems.length} de {filteredItems.length}</span>
        <div className="flex items-center gap-1 font-medium">
          <span>Por página: 10</span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
        </div>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#0D1322] border border-slate-800 rounded-t-2xl sm:rounded-xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 text-slate-100 max-h-[90dvh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-100">
                {editingItem ? `Editar en ${getCollectionTitle(slug)}` : `Nuevo Registro en ${getCollectionTitle(slug)}`}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {Object.keys(formData)
                .filter((k) => !['id', 'createdAt', 'updatedAt', '__v', '_status', 'sessions', 'collection', 'loginAttempts', 'lockUntil', 'resetPasswordToken', 'resetPasswordExpiration', 'salt', 'hash'].includes(k))
                .map((key) => {
                  const val = formData[key]
                  return (
                    <div key={key} className="space-y-1">
                      <label className="block font-semibold text-slate-300">
                        {getFieldLabel(key)}
                      </label>
                      {key === 'role' ? (
                        <select
                          value={(val as string) ?? 'admin'}
                          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-800 rounded-md text-xs text-slate-100 bg-[#060913] focus:outline-none focus:border-cyan-500"
                        >
                          <option value="admin">Administrador (admin)</option>
                          <option value="editor">Editor (editor)</option>
                        </select>
                      ) : key === 'category' && slug === 'projects' ? (
                        <select
                          value={(val as string) ?? 'custom'}
                          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-800 rounded-md text-xs text-slate-100 bg-[#060913] focus:outline-none focus:border-cyan-500"
                        >
                          <option value="nextjs">Next.js & React (nextjs)</option>
                          <option value="wordpress">WordPress (wordpress)</option>
                          <option value="woocommerce">WooCommerce (woocommerce)</option>
                          <option value="custom">Software a Medida (custom)</option>
                        </select>
                      ) : key === 'description' || key === 'answer' ? (
                        <textarea
                          rows={3}
                          value={(val as string) ?? ''}
                          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-800 rounded-md text-xs text-slate-100 bg-[#060913] focus:outline-none focus:border-cyan-500"
                          required={key === 'description' || key === 'answer'}
                        />
                      ) : key === 'highlight' ? (
                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="checkbox"
                            checked={Boolean(val)}
                            onChange={(e) => setFormData({ ...formData, [key]: e.target.checked })}
                            className="w-4 h-4 rounded border-slate-700 bg-[#060913] text-cyan-500 focus:ring-cyan-500 cursor-pointer"
                          />
                          <span className="text-slate-300">Destacar servicio en portada</span>
                        </div>
                      ) : (
                        <div>
                          <input
                            type={key === 'password' ? 'password' : key === 'order' ? 'number' : 'text'}
                            value={
                              Array.isArray(val)
                                ? val.map((v) => (typeof v === 'object' && v !== null && ('tag' in v || 'feature' in v) ? (v.tag || v.feature) : String(v))).join(', ')
                                : (val as string | number) ?? ''
                            }
                            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-800 rounded-md text-xs text-slate-100 bg-[#060913] focus:outline-none focus:border-cyan-500"
                            required={key === 'title' || key === 'email' || key === 'question'}
                          />
                          {(key === 'tags' || key === 'features') && (
                            <p className="text-[11px] text-slate-400 mt-1">
                              Separa los elementos por comas (ej. React, Next.js, Tailwind)
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-800 bg-slate-900 rounded-md text-xs font-medium text-slate-300 hover:bg-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-md text-xs shadow-md inline-flex items-center gap-1.5"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingItem ? 'Guardar Cambios' : 'Crear Registro'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#0D1322] border border-slate-800 rounded-t-2xl sm:rounded-xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4 text-slate-100 animate-in fade-in duration-150">
            <div className="flex items-center gap-3 text-amber-400">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-100">¿Confirmar Eliminación?</h3>
                <p className="text-xs text-slate-400 mt-0.5">Esta acción no se puede deshacer.</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 bg-[#060913] p-3 rounded-lg border border-slate-800/80">
              ¿Estás seguro de que deseas eliminar este registro de <strong className="text-slate-100">{getCollectionTitle(slug)}</strong>?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 border border-slate-800 bg-slate-900 rounded-md text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={executeDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md text-xs font-bold shadow-md transition-colors inline-flex items-center gap-1.5"
              >
                {deleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Eliminar Registro</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
