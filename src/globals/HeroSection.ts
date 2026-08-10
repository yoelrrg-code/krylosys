import type { GlobalConfig } from 'payload'

export const HeroSection: GlobalConfig = {
  slug: 'hero-section',
  label: 'Sección Hero',
  fields: [
    {
      name: 'badgeText',
      type: 'text',
      required: true,
      defaultValue: 'Agencia de Desarrollo Web & Software de Alto Rendimiento',
      label: 'Texto del Badge Superior',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'Creamos soluciones digitales que hacen crecer tu negocio',
      label: 'Título Principal (Headline)',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
      defaultValue: 'Especialistas en desarrollo corporativo en WordPress, tiendas e-commerce de alto rendimiento con WooCommerce, plataformas ultrarrápidas en Next.js y software personalizado a medida.',
      label: 'Subtítulo',
    },
    {
      name: 'ctaPrimaryText',
      type: 'text',
      defaultValue: 'Explorar Soluciones',
      label: 'Texto Botón Primario',
    },
    {
      name: 'ctaSecondaryText',
      type: 'text',
      defaultValue: 'Hablar por WhatsApp',
      label: 'Texto Botón Secundario (WhatsApp)',
    },
  ],
}
