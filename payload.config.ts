import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './src/collections/Users'
import { Services } from './src/collections/Services'
import { Projects } from './src/collections/Projects'
import { FAQs } from './src/collections/FAQs'

import { HeroSection } from './src/globals/HeroSection'
import { AboutSection } from './src/globals/AboutSection'
import { ServicesSection } from './src/globals/ServicesSection'
import { ProjectsSection } from './src/globals/ProjectsSection'
import { FaqSection } from './src/globals/FaqSection'
import { ContactInfo } from './src/globals/ContactInfo'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    theme: 'dark',
    components: {
      graphics: {
        Logo: '/src/components/payload-logo#AdminLogo',
        Icon: '/src/components/payload-logo#AdminIcon',
      },
      beforeDashboard: [
        '/src/components/payload-dashboard#AdminDashboard',
      ],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Services, Projects, FAQs],
  globals: [HeroSection, AboutSection, ServicesSection, ProjectsSection, FaqSection, ContactInfo],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'krylosys-super-secret-key-2026-secure-token',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./data/payload.db',
    },
  }),
})
