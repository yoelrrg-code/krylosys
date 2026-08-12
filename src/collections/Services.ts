import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título del Servicio',
    },
    {
      name: 'badge',
      type: 'text',
      required: true,
      label: 'Insignia (ej. E-Commerce, WordPress Corporate)',
    },
    {
      name: 'score',
      type: 'text',
      required: true,
      label: 'Métrica / Destacado (ej. Score Lighthouse 99+)',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Descripción',
    },
    {
      name: 'highlight',
      type: 'checkbox',
      defaultValue: false,
      label: 'Destacar este servicio (Efecto Resplandor Neón)',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Características principales',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
          label: 'Característica',
        },
      ],
    },
    {
      name: 'whatsappMsg',
      type: 'text',
      label: 'Mensaje predeterminado de WhatsApp para este servicio',
    },
  ],
}
