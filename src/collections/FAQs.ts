import type { CollectionConfig } from 'payload'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      label: 'Pregunta Frecuente',
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      label: 'Respuesta',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: 'Orden de aparición',
    },
  ],
}
