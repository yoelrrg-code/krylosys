import type { GlobalConfig } from 'payload'

export const ProjectsSection: GlobalConfig = {
  slug: 'projects-section',
  label: 'Sección Proyectos',
  fields: [
    {
      name: 'badge',
      type: 'text',
      defaultValue: 'Casos de Éxito',
      label: 'Badge Superior (Insignia)',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Portafolio de desarrollo & proyectos',
      label: 'Título Principal',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: 'Explorá algunos de los proyectos y soluciones desarrolladas para nuestros clientes.',
      label: 'Subtítulo / Descripción',
    },
  ],
}
