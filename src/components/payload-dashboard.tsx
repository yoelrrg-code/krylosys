import React from 'react'

export function AdminDashboard() {
  const globalLinks = [
    { title: 'Hero (Inicio)', href: '/admin/globals/hero-section', desc: 'Título principal, subtítulo y botones CTA', icon: '🚀' },
    { title: 'Nosotros', href: '/admin/globals/about-section', desc: 'Tarjetas Bento Grid y contadores de métricas', icon: '✨' },
    { title: 'Servicios (Global)', href: '/admin/globals/services-section', desc: 'Encabezado, título y descripción de servicios', icon: '⚡' },
    { title: 'Proyectos (Global)', href: '/admin/globals/projects-section', desc: 'Encabezado y subtítulo del portafolio', icon: '💼' },
    { title: 'Preguntas Frecuentes (Global)', href: '/admin/globals/faq-section', desc: 'Encabezado y subtítulo del módulo FAQ', icon: '❓' },
    { title: 'Contacto', href: '/admin/globals/contact-info', desc: 'Email, WhatsApp, teléfonos y redes', icon: '📱' },
  ]

  const collectionLinks = [
    { title: 'Servicios (Lista)', href: '/admin/collections/services', desc: 'Crear, editar o eliminar tarjetas de servicios', count: '4 ítems', icon: '🛠️' },
    { title: 'Proyectos (Lista)', href: '/admin/collections/projects', desc: 'Gestión de casos de éxito y portafolio', count: '4 ítems', icon: '📂' },
    { title: 'Preguntas Frecuentes (Lista)', href: '/admin/collections/faqs', desc: 'Gestión de preguntas y respuestas', count: '5 ítems', icon: '💡' },
  ]

  return (
    <div style={{ padding: '1.5rem 0 2rem 0', color: '#F8FAFC' }}>
      
      {/* Banner Superior */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(0, 200, 255, 0.1) 0%, rgba(15, 23, 42, 0.8) 100%)',
          border: '1px solid #1E293B',
          borderRadius: '16px',
          padding: '2rem 2.25rem',
          marginBottom: '2.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem',
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.75rem', borderRadius: '20px', backgroundColor: 'rgba(0, 200, 255, 0.15)', color: '#00C8FF', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#00C8FF' }} />
            Krylosys Admin Panel
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>
            Panel de Control <span style={{ color: '#00C8FF' }}>Krylosys</span>
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '0.975rem', marginTop: '0.35rem', margin: 0 }}>
            Administrá todos los contenidos del sitio web en tiempo real.
          </p>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: '#00C8FF',
            color: '#060913',
            fontWeight: '700',
            padding: '0.65rem 1.25rem',
            borderRadius: '10px',
            textDecoration: 'none',
            fontSize: '0.875rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: '0 4px 14px rgba(0, 200, 255, 0.3)',
          }}
        >
          <span>Ver Sitio Web</span>
          <span>↗</span>
        </a>
      </div>

      {/* Grid Secciones Globales */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#FFFFFF', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>⚙️</span> Secciones Globales
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {globalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                backgroundColor: '#131C2E',
                border: '1px solid #1E293B',
                borderRadius: '14px',
                padding: '1.25rem',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                display: 'block',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.1rem' }}>{link.icon}</span>
                  <span style={{ color: '#FFFFFF', fontWeight: '700', fontSize: '0.975rem' }}>{link.title}</span>
                </div>
                <span style={{ color: '#00C8FF', fontWeight: '700' }}>→</span>
              </div>
              <p style={{ color: '#94A3B8', fontSize: '0.85rem', margin: 0, lineHeight: 1.4 }}>{link.desc}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Grid Colecciones */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#FFFFFF', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>📦</span> Colecciones de Datos (Listados)
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {collectionLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                backgroundColor: '#131C2E',
                border: '1px solid #1E293B',
                borderRadius: '14px',
                padding: '1.25rem',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                display: 'block',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.1rem' }}>{link.icon}</span>
                  <span style={{ color: '#FFFFFF', fontWeight: '700', fontSize: '0.975rem' }}>{link.title}</span>
                </div>
                <span style={{ backgroundColor: 'rgba(0, 200, 255, 0.15)', color: '#00C8FF', padding: '0.2rem 0.5rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '700' }}>
                  {link.count}
                </span>
              </div>
              <p style={{ color: '#94A3B8', fontSize: '0.85rem', margin: 0, lineHeight: 1.4 }}>{link.desc}</p>
            </a>
          ))}
        </div>
      </div>

    </div>
  )
}
