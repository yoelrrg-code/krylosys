import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título del Proyecto',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Next.js & React', value: 'nextjs' },
        { label: 'WordPress', value: 'wordpress' },
        { label: 'WooCommerce', value: 'woocommerce' },
        { label: 'Software a Medida', value: 'custom' },
      ],
      label: 'Categoría',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Descripción',
    },
    {
      name: 'metrics',
      type: 'text',
      label: 'Métrica de Éxito (ej. Lighthouse 100/100, +140% Conversión)',
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Etiquetas Tecnológicas',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
          label: 'Tecnología',
        },
      ],
    },
    {
      name: 'demoUrl',
      type: 'text',
      label: 'Enlace a la Demostración',
    },
  ],
}
