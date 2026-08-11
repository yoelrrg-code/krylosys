import type { GlobalConfig } from 'payload'

export const AboutSection: GlobalConfig = {
  slug: 'about-section',
  label: 'Sección Nosotros',
  fields: [
    {
      name: 'badge',
      type: 'text',
      defaultValue: 'Nosotros',
      label: 'Badge Superior',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'En Krylosys convertimos necesidades complejas en desarrollo simple y efectivo.',
      label: 'Título Principal',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: 'Somos un equipo especializado en desarrollo de software y presencia digital de alto impacto para empresas y negocios que exigen soluciones robustas, rápidas y escalables.',
      label: 'Descripción Principal',
    },
    // Card 1: Main Panel & Metrics
    {
      type: 'group',
      name: 'cardMain',
      label: 'Tarjeta 1: Arquitectura & Rendimiento (Principal)',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Arquitectura de Software & Rendimiento de Élite',
          label: 'Título Tarjeta Principal',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'Diseñamos y programamos con las mejores prácticas de la industria: componentes modulares, optimización SEO de primer nivel, tiempos de respuesta ultra rápidos y cero sobrecarga innecesaria.',
          label: 'Descripción Tarjeta Principal',
        },
        {
          name: 'metric1Value',
          type: 'text',
          defaultValue: '100%',
          label: 'Métrica 1 - Valor',
        },
        {
          name: 'metric1Label',
          type: 'text',
          defaultValue: 'Garantía de Calidad',
          label: 'Métrica 1 - Etiqueta',
        },
        {
          name: 'metric2Value',
          type: 'text',
          defaultValue: '+50',
          label: 'Métrica 2 - Valor',
        },
        {
          name: 'metric2Label',
          type: 'text',
          defaultValue: 'Proyectos Entregados',
          label: 'Métrica 2 - Etiqueta',
        },
        {
          name: 'metric3Value',
          type: 'text',
          defaultValue: '24/7',
          label: 'Métrica 3 - Valor',
        },
        {
          name: 'metric3Label',
          type: 'text',
          defaultValue: 'Soporte Técnico',
          label: 'Métrica 3 - Etiqueta',
        },
      ],
    },
    // Card 2: Multi-Tech Solutions
    {
      type: 'group',
      name: 'cardMultiTech',
      label: 'Tarjeta 2: Soluciones Multi-Tecnología',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Soluciones Multi-Tecnología',
          label: 'Título',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'Seleccionamos la tecnología perfecta para tu caso: desde sitios autogestionables en WordPress y WooCommerce hasta webs en Next.js.',
          label: 'Descripción',
        },
        {
          name: 'badge',
          type: 'text',
          defaultValue: '✓ Flexibilidad Total',
          label: 'Insignia / Etiqueta inferior',
        },
      ],
    },
    // Card 3: Security & Clean Code
    {
      type: 'group',
      name: 'cardSecurity',
      label: 'Tarjeta 3: Seguridad & Código Limpio',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Seguridad & Código Limpio',
          label: 'Título',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'Implementamos protocolos de seguridad avanzada y mejores prácticas de optimización de código para garantizar confiabilidad y protección continua.',
          label: 'Descripción',
        },
      ],
    },
    // Card 4: Results & Conversion
    {
      type: 'group',
      name: 'cardResults',
      label: 'Tarjeta 4: Enfoque en Resultados & Conversión',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Enfoque en Resultados & Conversión',
          label: 'Título',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'No solo construimos código: diseñamos cada interfaz orientada a maximizar tus conversiones, la retención de usuarios y el impacto comercial de tu marca.',
          label: 'Descripción',
        },
      ],
    },
  ],
}
