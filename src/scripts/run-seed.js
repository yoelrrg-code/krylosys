import process from 'node:process'
import { getPayload } from 'payload'
import config from '../../payload.config.ts'

async function run() {
  console.log('Connecting to Payload & Neon Postgres database...')
  const payload = await getPayload({ config })
  console.log('Connected!')

  // 1. Admin User
  const existingUsers = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: 'yoelkys.rrg@gmail.com',
      },
    },
  })

  if (existingUsers.docs.length === 0) {
    console.log('Creando usuario administrador inicial...')
    await payload.create({
      collection: 'users',
      data: {
        email: 'yoelkys.rrg@gmail.com',
        password: 'Dev@123!',
        name: 'Yoelkys - Admin Krylosys',
        role: 'admin',
      },
    })
    console.log('✓ Usuario administrador creado.')
  } else {
    console.log('✓ El usuario administrador ya existe.')
  }

  // 2. Hero Section Global
  console.log('Actualizando Sección Hero...')
  await payload.updateGlobal({
    slug: 'hero-section',
    data: {
      badgeText: 'Desarrollo de Software & Soluciones Web de Alto Rendimiento',
      headline: 'Construimos tu presencia digital con tecnología de vanguardia',
      subtitle: 'Expertos en sitios corporativos en WordPress, tiendas online WooCommerce, landing pages ultrarrápidas en Next.js y desarrollo de software a medida.',
      ctaPrimaryText: 'Iniciar Proyecto',
      ctaSecondaryText: 'Hablar por WhatsApp',
    },
  })

  // 3. Services Header Global
  console.log('Actualizando Encabezado Sección Servicios...')
  await payload.updateGlobal({
    slug: 'services-section',
    data: {
      badge: 'Nuestras Soluciones',
      title: 'Servicios adaptados a cada etapa de tu empresa',
      description: 'Ofrecemos el equilibrio perfecto entre tecnología moderna, usabilidad y retorno de inversión.',
    },
  })

  // 4. Projects Header Global
  console.log('Actualizando Encabezado Sección Proyectos...')
  await payload.updateGlobal({
    slug: 'projects-section',
    data: {
      badge: 'Portafolio Reciente',
      title: 'Casos de Éxito & Desarrollo de Software',
      description: 'Explora nuestros proyectos desarrollados con estándares de código limpio, alto rendimiento y UX orientada a ventas.',
    },
  })

  // 5. Seed Services
  const existingServices = await payload.find({ collection: 'services', limit: 1 })
  if (existingServices.docs.length === 0) {
    console.log('Creando servicios iniciales...')
    await payload.create({
      collection: 'services',
      data: {
        title: 'Desarrollo de Software a Medida',
        badge: 'Solución Enterprise',
        score: '99.9%',
        description: 'Construcción de aplicaciones web complejas, paneles de administración, sistemas SaaS e integraciones de API personalizadas.',
        highlight: true,
        features: [{ feature: 'Next.js & React' }, { feature: 'Arquitectura Escalable' }, { feature: 'Seguridad Avanzada' }],
        whatsappMsg: 'Hola Krylosys, me interesa solicitar una cotización para un desarrollo de software a medida.',
      },
    })
    await payload.create({
      collection: 'services',
      data: {
        title: 'Sitios Web Corporativos en WordPress',
        badge: 'WordPress Pro',
        score: '100%',
        description: 'Desarrollo de páginas web corporativas profesionales, autogestionables, ultrarrápidas y optimizadas para posicionamiento SEO.',
        highlight: true,
        features: [{ feature: 'Autogestionable' }, { feature: 'Optimización SEO' }, { feature: 'Diseño Responsivo' }],
        whatsappMsg: 'Hola Krylosys, quisiera más información sobre el desarrollo de sitios corporativos en WordPress.',
      },
    })
    await payload.create({
      collection: 'services',
      data: {
        title: 'Tiendas Online WooCommerce',
        badge: 'E-commerce Pro',
        score: '98%',
        description: 'Creación de tiendas virtuales optimizadas para ventas, pasarelas de pago locales/internacionales, catálogo de productos e inventario.',
        highlight: false,
        features: [{ feature: 'Pasarelas de Pago' }, { feature: 'Gestión de Productos' }, { feature: 'Checkout Optimizado' }],
        whatsappMsg: 'Hola Krylosys, necesito asesoramiento para crear una tienda online en WooCommerce.',
      },
    })
    console.log('✓ Servicios creados.')
  }

  // 6. Seed Projects
  const existingProjects = await payload.find({ collection: 'projects', limit: 1 })
  if (existingProjects.docs.length === 0) {
    console.log('Creando proyectos iniciales...')
    await payload.create({
      collection: 'projects',
      data: {
        title: 'Plataforma SaaS de Gestión Empresarial',
        category: 'nextjs',
        description: 'Sistema web a medida desarrollado en Next.js para la automatización de procesos internos, reportes en tiempo real y gestión de clientes.',
        metrics: '+300% Eficiencia Operativa',
        tags: [{ tag: 'Next.js' }, { tag: 'TypeScript' }, { tag: 'Tailwind CSS' }],
        demoUrl: 'https://krylosys.com',
      },
    })
    await payload.create({
      collection: 'projects',
      data: {
        title: 'Portal Corporativo Internacional',
        category: 'wordpress',
        description: 'Sitio web corporativo en WordPress multi-idioma con arquitectura modular, tiempos de carga inferiores a 1 segundo y puntuación 100 en Google PageSpeed.',
        metrics: '100/100 PageSpeed Score',
        tags: [{ tag: 'WordPress' }, { tag: 'SEO Pro' }, { tag: 'Performance' }],
        demoUrl: 'https://krylosys.com',
      },
    })
    console.log('✓ Proyectos creados.')
  }

  // 7. Seed FAQs
  const existingFaqs = await payload.find({ collection: 'faqs', limit: 1 })
  if (existingFaqs.docs.length === 0) {
    console.log('Creando preguntas frecuentes iniciales...')
    await payload.create({
      collection: 'faqs',
      data: {
        question: '¿Qué tecnología me conviene usar: WordPress, WooCommerce o un desarrollo a medida en Next.js?',
        answer: 'Depende de tus objetivos comerciales. Si buscas una web corporativa fácil de administrar o una tienda online estándar, WordPress y WooCommerce son ideales. Si necesitas máxima velocidad, seguridad avanzada o un sistema SaaS personalizado, Next.js es la mejor opción.',
        order: 1,
      },
    })
    await payload.create({
      collection: 'faqs',
      data: {
        question: '¿Ofrecen soporte técnico post-lanzamiento y mantenimiento?',
        answer: 'Sí, todos nuestros proyectos incluyen período de soporte post-entrega y planes opcionales de mantenimiento preventivo, actualizaciones de seguridad y optimización continua.',
        order: 2,
      },
    })
    console.log('✓ FAQs creadas.')
  }

  console.log('=== SEEDING FINALIZADO CON ÉXITO ===')
  process.exit(0)
}

run().catch((err) => {
  console.error('SEEDING FAILED:', err)
  process.exit(1)
})
