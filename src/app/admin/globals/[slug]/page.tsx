'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Save, Check, Loader2, ArrowLeft } from 'lucide-react'
import { getGlobalData, updateGlobalData } from '../../actions'

const GLOBAL_TITLES: Record<string, string> = {
  'hero-section': 'Sección Principal (Hero)',
  'about-section': 'Sección Nosotros',
  'services-section': 'Configuración de Servicios',
  'projects-section': 'Configuración de Proyectos',
  'faq-section': 'Sección Preguntas Frecuentes',
  'contact-info': 'Información de Contacto & Redes',
}

const FIELD_LABELS: Record<string, string> = {
  title: 'Título Principal',
  headline: 'Título Destacado (Headline)',
  subtitle: 'Subtítulo',
  badge: 'Badge / Insignia Superior',
  badgeText: 'Texto de la Insignia',
  ctaText: 'Texto Botón Principal (CTA)',
  ctaLink: 'Enlace Botón Principal (CTA)',
  ctaPrimaryText: 'Texto Botón Principal (CTA)',
  ctaPrimaryLink: 'Enlace Botón Principal (CTA)',
  ctaSecondaryText: 'Texto Botón Secundario (CTA)',
  ctaSecondaryLink: 'Enlace Botón Secundario (CTA)',
  secondaryCtaText: 'Texto Botón Secundario',
  secondaryCtaLink: 'Enlace Botón Secundario',
  description: 'Descripción',
  metrics: 'Métricas / Estadísticas',
  whatsapp: 'WhatsApp',
  whatsappNumber: 'Número de WhatsApp Internacional',
  phone: 'Teléfono Directo / Pantalla',
  email: 'Correo Electrónico Corporativo',
  address: 'Ubicación / Dirección',
  businessHours: 'Horario de Atención',
  linkedin: 'Perfil de LinkedIn',
  github: 'Perfil de GitHub',
  instagram: 'Perfil de Instagram',
  facebook: 'Perfil de Facebook',
  twitter: 'Perfil de X / Twitter',
  cards: 'Tarjetas de Información',
  cardMain: 'Tarjeta 1: Arquitectura & Rendimiento',
  cardMultiTech: 'Tarjeta 2: Soluciones Multi-Tecnología',
  cardSecurity: 'Tarjeta 3: Seguridad & Código Limpio',
  cardResults: 'Tarjeta 4: Enfoque en Resultados',
  metric1Value: 'Métrica 1 - Valor',
  metric1Label: 'Métrica 1 - Etiqueta',
  metric2Value: 'Métrica 2 - Valor',
  metric2Label: 'Métrica 2 - Etiqueta',
  metric3Value: 'Métrica 3 - Valor',
  metric3Label: 'Métrica 3 - Etiqueta',
  items: 'Lista de Elementos',
}

function getGlobalTitle(slug: string): string {
  return GLOBAL_TITLES[slug] || slug.replace('-', ' ')
}

function getFieldLabel(key: string): string {
  return FIELD_LABELS[key] || key
}

export default function GlobalEditPage() {
  const params = useParams()
  const router = useRouter()
  const slug = (params.slug as string) || 'hero-section'

  const [formData, setFormData] = useState<Record<string, unknown>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  useEffect(() => {
    let isSubscribed = true
    getGlobalData(slug).then((res) => {
      if (isSubscribed) {
        if (res.success && res.data) {
          setFormData(res.data)
        }
        setLoading(false)
      }
    })
    return () => {
      isSubscribed = false
    }
  }, [slug])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSavedSuccess(false)
    
    // Clean out internal payload fields before saving
    const cleanData = { ...formData }
    delete cleanData.id
    delete cleanData.createdAt
    delete cleanData.updatedAt
    delete cleanData.globalType

    const res = await updateGlobalData(slug, cleanData)
    setSaving(false)
    if (res.success) {
      setSavedSuccess(true)
      setTimeout(() => setSavedSuccess(false), 3000)
    }
  }

  const renderInputs = (obj: Record<string, unknown> | null | undefined, parentKey = '') => {
    if (!obj || typeof obj !== 'object') return null

    const data = obj as Record<string, unknown>

    return Object.keys(data)
      .filter((k) => !['id', 'createdAt', 'updatedAt', 'globalType', '_status', '__v'].includes(k))
      .map((key) => {
        const value = data[key]
        const fullKey = parentKey ? `${parentKey}.${key}` : key

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          return (
            <div key={fullKey} className="p-4 bg-zinc-50 border border-zinc-200 rounded-lg space-y-3">
              <h4 className="font-bold text-xs text-zinc-900 border-b border-zinc-200 pb-2">
                {getFieldLabel(key)}
              </h4>
              {renderInputs(value as Record<string, unknown>, fullKey)}
            </div>
          )
        }

        if (Array.isArray(value)) {
          return (
            <div key={fullKey} className="p-4 bg-zinc-50 border border-zinc-200 rounded-lg space-y-2">
              <h4 className="font-bold text-xs text-zinc-900">
                {getFieldLabel(key)} (Lista de {value.length} elementos)
              </h4>
              <p className="text-[11px] text-zinc-500">Edición de lista en formato JSON</p>
              <textarea
                value={JSON.stringify(value, null, 2)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value)
                    setFormData((prev) => {
                      const updated: Record<string, unknown> = { ...prev }
                      if (parentKey) {
                        const parentObj = updated[parentKey] as Record<string, unknown>
                        if (parentObj) parentObj[key] = parsed
                      } else {
                        updated[key] = parsed
                      }
                      return updated
                    })
                  } catch {}
                }}
                rows={4}
                className="w-full p-2 bg-white border border-zinc-200 rounded-md font-mono text-[11px] text-zinc-900 focus:outline-none focus:border-zinc-900"
              />
            </div>
          )
        }

        return (
          <div key={fullKey} className="space-y-1">
            <label className="block text-xs font-semibold text-zinc-700">
              {getFieldLabel(key)}
            </label>
            {typeof value === 'string' && value.length > 80 ? (
              <textarea
                value={value || ''}
                onChange={(e) => {
                  const val = e.target.value
                  setFormData((prev) => {
                    const updated = JSON.parse(JSON.stringify(prev)) as Record<string, unknown>
                    if (parentKey) {
                      const keys = parentKey.split('.')
                      let curr = updated
                      keys.forEach((k) => { curr = curr[k] as Record<string, unknown> })
                      curr[key] = val
                    } else {
                      updated[key] = val
                    }
                    return updated
                  })
                }}
                rows={3}
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-md text-xs text-zinc-900 focus:outline-none focus:border-zinc-900"
              />
            ) : (
              <input
                type="text"
                value={(value as string | number | undefined) ?? ''}
                onChange={(e) => {
                  const val = e.target.value
                  setFormData((prev) => {
                    const updated = JSON.parse(JSON.stringify(prev)) as Record<string, unknown>
                    if (parentKey) {
                      const keys = parentKey.split('.')
                      let curr = updated
                      keys.forEach((k) => { curr = curr[k] as Record<string, unknown> })
                      curr[key] = val
                    } else {
                      updated[key] = val
                    }
                    return updated
                  })
                }}
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-md text-xs text-zinc-900 focus:outline-none focus:border-zinc-900"
              />
            )}
          </div>
        )
      })
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto select-none pb-12">
      
      {/* Breadcrumb & Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/admin')}
            className="p-1.5 rounded-md border border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="text-xs text-zinc-500 flex items-center gap-1.5 font-medium">
              <span>Admin</span>
              <span>/</span>
              <span>Secciones Globales</span>
            </div>
            <h1 className="text-2xl font-bold text-zinc-950 tracking-tight">
              {getGlobalTitle(slug)}
            </h1>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white font-medium px-4 py-2 rounded-md text-xs shadow-2xs transition-colors"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : savedSuccess ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{saving ? 'Guardando...' : savedSuccess ? '¡Guardado Exitoso!' : 'Guardar Cambios'}</span>
        </button>
      </div>

      {/* Form Container */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-2xs space-y-6">
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center gap-3 text-zinc-400">
            <Loader2 className="w-6 h-6 animate-spin text-zinc-900" />
            <span className="text-xs font-medium">Cargando configuración global...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderInputs(formData)}
          </form>
        )}
      </div>

    </div>
  )
}
