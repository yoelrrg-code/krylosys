import type { GlobalConfig } from 'payload'

export const FaqSection: GlobalConfig = {
  slug: 'faq-section',
  label: 'Sección FAQ',
  fields: [
    {
      name: 'badge',
      type: 'text',
      defaultValue: 'Preguntas Frecuentes',
      label: 'Badge Superior (Insignia)',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Resolvemos tus dudas sobre desarrollo web y software',
      label: 'Título Principal',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: 'Todo lo que necesitás saber antes de iniciar tu próximo proyecto con Krylosys.',
      label: 'Subtítulo / Descripción',
    },
  ],
}
