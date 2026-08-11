import type { GlobalConfig } from 'payload'

export const ServicesSection: GlobalConfig = {
  slug: 'services-section',
  label: 'Sección Servicios',
  fields: [
    {
      name: 'badge',
      type: 'text',
      defaultValue: 'Nuestras Soluciones',
      label: 'Badge Superior (Insignia)',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Servicios adaptados a cada etapa de tu empresa',
      label: 'Título Principal',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: 'Ofrecemos el equilibrio perfecto entre tecnología moderna, usabilidad y retorno de inversión.',
      label: 'Subtítulo / Descripción',
    },
  ],
}
