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
  Loader2
} from 'lucide-react'
import {
  getCollectionItems,
  createCollectionItem,
  updateCollectionItem,
  deleteCollectionItem
} from '../../actions'

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

  const [items, setItems] = useState<CollectionItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<CollectionItem | null>(null)
  const [formData, setFormData] = useState<Record<string, unknown>>({})
  const [submitting, setSubmitting] = useState(false)

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
    const text = JSON.stringify(item).toLowerCase()
    return text.includes(searchTerm.toLowerCase())
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

  const handleDelete = async (id: string | number) => {
    if (confirm('¿Estás seguro de eliminar este registro?')) {
      await deleteCollectionItem(slug, id)
      await loadData()
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
      await updateCollectionItem(slug, editingItem.id, payload)
    } else {
      await createCollectionItem(slug, payload)
    }
    setSubmitting(false)
    setIsModalOpen(false)
    await loadData()
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto select-none">
      
      {/* Breadcrumb */}
      <div className="text-xs text-zinc-500 flex items-center gap-1.5 font-medium">
        <span>Admin</span>
        <span>/</span>
        <span className="text-zinc-900 font-semibold">{getCollectionTitle(slug)}</span>
      </div>

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-zinc-950 tracking-tight">
            {getCollectionTitle(slug)}
          </h1>
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 text-white font-medium px-3.5 py-1.5 rounded-md text-xs shadow-2xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Crear Nuevo</span>
          </button>
        </div>
      </div>

      {/* Filter & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 border border-zinc-200 rounded-xl shadow-2xs">
        
        <div className="relative flex items-center flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            placeholder={`Buscar por ${slug === 'users' ? 'email o nombre' : 'título'}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-white border border-zinc-200 rounded-md text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100/80 hover:bg-zinc-200/80 border border-zinc-200 rounded-md text-xs font-medium text-zinc-900 transition-colors">
            <Columns className="w-3.5 h-3.5 text-zinc-500" />
            <span>Columnas</span>
            <ChevronDown className="w-3 h-3 text-zinc-400" />
          </button>

          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100/80 hover:bg-zinc-200/80 border border-zinc-200 rounded-md text-xs font-medium text-zinc-900 transition-colors">
            <Filter className="w-3.5 h-3.5 text-zinc-500" />
            <span>Filtros</span>
            <ChevronDown className="w-3 h-3 text-zinc-400" />
          </button>
        </div>

      </div>

      {/* Data Table */}
      <div className="bg-white border border-zinc-200 rounded-xl shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center gap-3 text-zinc-400">
            <Loader2 className="w-6 h-6 animate-spin text-zinc-900" />
            <span className="text-xs font-medium">Cargando datos de la colección...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 text-xs">
            No se encontraron registros en esta colección.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3.5 pl-5"># ID</th>
                  {slug === 'users' && (
                    <>
                      <th className="p-3.5">Email</th>
                      <th className="p-3.5">Nombre Completo</th>
                      <th className="p-3.5">Rol</th>
                    </>
                  )}
                  {slug === 'services' && (
                    <>
                      <th className="p-3.5">Título</th>
                      <th className="p-3.5">Insignia (Badge)</th>
                      <th className="p-3.5">Métrica / Score</th>
                      <th className="p-3.5">Portada</th>
                    </>
                  )}
                  {slug === 'projects' && (
                    <>
                      <th className="p-3.5">Título</th>
                      <th className="p-3.5">Categoría</th>
                      <th className="p-3.5">Métrica</th>
                    </>
                  )}
                  {slug === 'faqs' && (
                    <>
                      <th className="p-3.5">Pregunta</th>
                      <th className="p-3.5">Orden</th>
                    </>
                  )}
                  <th className="p-3.5">Actualizado</th>
                  <th className="p-3.5 text-right pr-5">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-900">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50/70 transition-colors">
                    <td className="p-3.5 pl-5 font-mono text-zinc-400 text-[11px]">{item.id}</td>
                    
                    {slug === 'users' && (
                      <>
                        <td className="p-3.5 font-medium">{item.email}</td>
                        <td className="p-3.5 text-zinc-600">{item.name || item.fullName || 'Yoelkys - Admin Krylosys'}</td>
                        <td className="p-3.5">
                          <span className="inline-flex px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-800 text-[10px] font-bold uppercase">
                            {item.role || 'Administrador'}
                          </span>
                        </td>
                      </>
                    )}

                    {slug === 'services' && (
                      <>
                        <td className="p-3.5 font-semibold text-zinc-950">{String(item.title || '')}</td>
                        <td className="p-3.5 text-zinc-600 font-medium">{String(item.badge || '')}</td>
                        <td className="p-3.5 text-zinc-500">{String(item.score || '')}</td>
                        <td className="p-3.5">
                          <span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            item.highlight ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-zinc-100 text-zinc-500'
                          }`}>
                            {item.highlight ? 'Destacado' : 'Estándar'}
                          </span>
                        </td>
                      </>
                    )}

                    {slug === 'projects' && (
                      <>
                        <td className="p-3.5 font-semibold text-zinc-950">{String(item.title || '')}</td>
                        <td className="p-3.5">
                          <span className="inline-flex px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-800 text-[10px] font-semibold uppercase">
                            {String(item.category || '')}
                          </span>
                        </td>
                        <td className="p-3.5 text-zinc-500">{String(item.metrics || '')}</td>
                      </>
                    )}

                    {slug === 'faqs' && (
                      <>
                        <td className="p-3.5 font-semibold text-zinc-950">{item.question}</td>
                        <td className="p-3.5 font-medium text-zinc-400">{item.order}</td>
                      </>
                    )}

                    <td className="p-3.5 text-zinc-400 text-[11px]">
                      {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : 'Reciente'}
                    </td>

                    <td className="p-3.5 text-right pr-5 space-x-2">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 rounded-md border border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => item.id !== undefined && handleDelete(item.id)}
                        className="p-1.5 rounded-md border border-zinc-200 text-red-600 hover:bg-red-50 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between text-xs text-zinc-500 px-1 select-none">
        <span>1-{filteredItems.length} de {filteredItems.length}</span>
        <div className="flex items-center gap-1 font-medium">
          <span>Por página: 10</span>
          <ChevronDown className="w-3 h-3 text-zinc-400" />
        </div>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white border border-zinc-200 rounded-xl max-w-lg w-full p-6 shadow-xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h3 className="text-base font-bold text-zinc-950">
                {editingItem ? `Editar en ${getCollectionTitle(slug)}` : `Nuevo Registro en ${getCollectionTitle(slug)}`}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-md text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100"
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
                      <label className="block font-semibold text-zinc-700">
                        {getFieldLabel(key)}
                      </label>
                      {key === 'role' ? (
                        <select
                          value={(val as string) ?? 'admin'}
                          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                          className="w-full px-3 py-2 border border-zinc-200 rounded-md text-xs text-zinc-900 bg-white focus:outline-none focus:border-zinc-900"
                        >
                          <option value="admin">Administrador (admin)</option>
                          <option value="editor">Editor (editor)</option>
                        </select>
                      ) : key === 'category' && slug === 'projects' ? (
                        <select
                          value={(val as string) ?? 'custom'}
                          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                          className="w-full px-3 py-2 border border-zinc-200 rounded-md text-xs text-zinc-900 bg-white focus:outline-none focus:border-zinc-900"
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
                          className="w-full px-3 py-2 border border-zinc-200 rounded-md text-xs text-zinc-900 focus:outline-none focus:border-zinc-900"
                          required={key === 'description' || key === 'answer'}
                        />
                      ) : key === 'highlight' ? (
                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="checkbox"
                            checked={Boolean(val)}
                            onChange={(e) => setFormData({ ...formData, [key]: e.target.checked })}
                            className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-950 cursor-pointer"
                          />
                          <span className="text-zinc-600">Destacar servicio en portada</span>
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
                            className="w-full px-3 py-2 border border-zinc-200 rounded-md text-xs text-zinc-900 focus:outline-none focus:border-zinc-900"
                            required={key === 'title' || key === 'email' || key === 'question'}
                          />
                          {(key === 'tags' || key === 'features') && (
                            <p className="text-[11px] text-zinc-400 mt-1">
                              Separa los elementos por comas (ej. React, Next.js, Tailwind)
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-zinc-200 rounded-md text-xs font-medium text-zinc-700 hover:bg-zinc-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-md text-xs font-medium shadow-2xs inline-flex items-center gap-1.5"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingItem ? 'Guardar Cambios' : 'Crear Registro'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  )
}
