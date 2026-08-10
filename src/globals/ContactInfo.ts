import type { GlobalConfig } from 'payload'

export const ContactInfo: GlobalConfig = {
  slug: 'contact-info',
  label: 'Información de Contacto',
  fields: [
    {
      name: 'email',
      type: 'text',
      required: true,
      defaultValue: 'contacto@krylosys.com',
      label: 'Correo Electrónico Corporativo',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      defaultValue: '+54 9 11 1234-5678',
      label: 'Teléfono / WhatsApp de Pantalla',
    },
    {
      name: 'whatsappNumber',
      type: 'text',
      required: true,
      defaultValue: '5491112345678',
      label: 'Número de WhatsApp (formato internacional sin espacios ni +)',
    },
    {
      name: 'businessHours',
      type: 'text',
      defaultValue: 'Atención: Lunes a Viernes de 9:00 a 18:00 hs',
      label: 'Horario de Atención',
    },
  ],
}
