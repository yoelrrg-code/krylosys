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
  ],
}
