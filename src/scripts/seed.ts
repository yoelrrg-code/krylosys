import { getPayload } from 'payload'
import config from '../../payload.config'

export async function seedDatabase() {
  const payload = await getPayload({ config })

  console.log('--- INICIANDO SEEDING DE BASE DE DATOS KRYLOSYS ---')

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
  console.log('✓ Sección Hero actualizada.')

  // 3. About Section Global
  console.log('Actualizando Sección Nosotros...')
  await payload.updateGlobal({
    slug: 'about-section',
    data: {
      badge: 'Nosotros',
      title: 'En Krylosys convertimos necesidades complejas en desarrollo simple y efectivo.',
      description: 'Somos un equipo especializado en desarrollo de software y presencia digital de alto impacto para empresas y negocios que exigen soluciones robustas, rápidas y escalables.',
    },
  })
  console.log('✓ Sección Nosotros actualizada.')

  // 4. Contact Info Global
  console.log('Actualizando Información de Contacto...')
  await payload.updateGlobal({
    slug: 'contact-info',
    data: {
      email: 'contacto@krylosys.com',
      phone: '+54 9 11 1234-5678',
      whatsappNumber: '5491112345678',
      businessHours: 'Atención: Lunes a Viernes de 9:00 a 18:00 hs',
    },
  })
  console.log('✓ Información de Contacto actualizada.')

  // 5. Services Collection
  console.log('Poblando Servicios...')
  const servicesData = [
    {
      title: 'Sitios Corporativos en WordPress',
      badge: 'WordPress Corporate',
      score: '100% Autogestionable',
      description: 'Desarrollamos sitios web profesionales, dinámicos y totalmente autogestionables para que puedas actualizar tu contenido sin depender de programadores.',
      highlight: false,
      whatsappMsg: 'Hola Krylosys, me interesa consultar por un sitio corporativo en WordPress.',
      features: [
        { feature: 'Panel de administración fácil de usar' },
        { feature: 'Diseño adaptativo 100% responsivo' },
        { feature: 'Optimización de velocidad y SEO On-Page' },
        { feature: 'Integración de formularios y redes sociales' },
      ],
    },
    {
      title: 'Tiendas Online con WooCommerce',
      badge: 'E-Commerce',
      score: 'Pagos & Inventario',
      description: 'Creamos tu tienda virtual personalizada con WooCommerce: rápida, segura y lista para procesar pagos y gestionar tu catálogo de productos sin complicaciones.',
      highlight: false,
      whatsappMsg: 'Hola Krylosys, quiero cotizar una tienda online en WooCommerce.',
      features: [
        { feature: 'Integración con Mercado Pago, Stripe y bancos' },
        { feature: 'Gestión de inventario y stock automatizado' },
        { feature: 'Cálculo automático de envíos y logística' },
        { feature: 'Diseño enfocado en tasa de conversión' },
      ],
    },
    {
      title: 'Landings y Webs Corporativas en Next.js',
      badge: 'Máxima Velocidad & SEO',
      score: 'Score Lighthouse 99+',
      description: 'Aprovechamos el poder de Next.js y React para construir landing pages e hiper-sitios de altísima velocidad, máxima puntuación en Google Lighthouse y excelente posicionamiento SEO.',
      highlight: true,
      whatsappMsg: 'Hola Krylosys, me interesa una landing/web corporativa en Next.js.',
      features: [
        { feature: 'Tiempos de carga ultra rápidos (Core Web Vitals)' },
        { feature: 'SSR / SSG para SEO de nivel superior' },
        { feature: 'Diseño web moderno con microanimaciones' },
        { feature: 'Seguridad de nivel corporativo' },
      ],
    },
    {
      title: 'Desarrollo Personalizado',
      badge: 'Software a Medida',
      score: 'Arquitectura Exclusiva',
      description: 'Construimos sistemas y plataformas web a la medida exacta de tus requerimientos operativos: paneles de control, APIs REST, automatizaciones e integraciones personalizadas.',
      highlight: false,
      whatsappMsg: 'Hola Krylosys, necesito asesoramiento para un desarrollo personalizado.',
      features: [
        { feature: 'Arquitectura de software escalable' },
        { feature: 'Integración de APIs de terceros' },
        { feature: 'Bases de datos optimizadas' },
        { feature: 'Paneles y dashboards administrativos' },
      ],
    },
  ]

  const existingServices = await payload.find({ collection: 'services', limit: 100 })
  if (existingServices.docs.length === 0) {
    for (const service of servicesData) {
      await payload.create({
        collection: 'services',
        data: service,
      })
    }
    console.log(`✓ ${servicesData.length} Servicios creados.`)
  } else {
    console.log(`✓ Colección de Servicios ya contiene ${existingServices.docs.length} registros.`)
  }

  // 6. Projects Collection
  console.log('Poblando Proyectos...')
  const projectsData = [
    {
      title: 'FinTech Corporate Platform',
      category: 'nextjs' as const,
      description: 'Plataforma financiera corporativa desarrollada con Next.js 15, SSR y métricas en tiempo real.',
      metrics: 'Lighthouse Score 100',
      demoUrl: '#contacto',
      tags: [
        { tag: 'Next.js' },
        { tag: 'React' },
        { tag: 'TypeScript' },
        { tag: 'Tailwind CSS' },
      ],
    },
    {
      title: 'Global E-Commerce Store',
      category: 'woocommerce' as const,
      description: 'Tienda online internacional con pasarelas de pago automatizadas e inventario en tiempo real.',
      metrics: '+140% Conversión de Ventas',
      demoUrl: '#contacto',
      tags: [
        { tag: 'WooCommerce' },
        { tag: 'WordPress' },
        { tag: 'Mercado Pago' },
        { tag: 'PHP' },
      ],
    },
    {
      title: 'Sitio Corporativo Institucional',
      category: 'wordpress' as const,
      description: 'Desarrollo institucional autogestionable optimizado para posicionamiento SEO orgánico en Google.',
      metrics: 'Posicionamiento Top 3 Google',
      demoUrl: '#contacto',
      tags: [
        { tag: 'WordPress' },
        { tag: 'SEO On-Page' },
        { tag: 'Autogestionable' },
      ],
    },
    {
      title: 'Dashboard de Gestión Operativa',
      category: 'custom' as const,
      description: 'Sistema web a medida con APIs REST, control de acceso por roles y reportes automatizados.',
      metrics: 'Automatización 90% Operativa',
      demoUrl: '#contacto',
      tags: [
        { tag: 'React' },
        { tag: 'Node.js' },
        { tag: 'APIs REST' },
        { tag: 'PostgreSQL' },
      ],
    },
  ]

  const existingProjects = await payload.find({ collection: 'projects', limit: 100 })
  if (existingProjects.docs.length === 0) {
    for (const project of projectsData) {
      await payload.create({
        collection: 'projects',
        data: project,
      })
    }
    console.log(`✓ ${projectsData.length} Proyectos creados.`)
  } else {
    console.log(`✓ Colección de Proyectos ya contiene ${existingProjects.docs.length} registros.`)
  }

  // 7. FAQs Collection
  console.log('Poblando Preguntas Frecuentes (FAQs)...')
  const faqsData = [
    {
      question: '¿Cuánto tiempo demora el desarrollo de una web corporativa o tienda online?',
      answer: 'Los plazos varían según el alcance del proyecto. Una landing page o sitio corporativo en WordPress suele tomar entre 1 y 2 semanas. Una tienda online completa en WooCommerce toma entre 2 y 4 semanas, mientras que un desarrollo de software personalizado en Next.js depende de la complejidad de la arquitectura (usualmente de 3 a 6 semanas).',
      order: 1,
    },
    {
      question: '¿Qué diferencia existe entre un sitio en WordPress y una web en Next.js?',
      answer: 'WordPress es ideal para empresas que buscan un gestor de contenidos 100% autogestionable con un panel de control intuitivo. Next.js es una tecnología basada en React diseñada para proyectos que exigen la máxima velocidad de carga posible, puntaje perfecto en Google Core Web Vitals, seguridad avanzada y arquitectura desacoplada.',
      order: 2,
    },
    {
      question: '¿Puedo administrar el catálogo y los pedidos de mi tienda WooCommerce yo mismo?',
      answer: '¡Totalmente! En Krylosys entregamos todas las tiendas WooCommerce configuradas con un panel administrativo amigable. Además, brindamos capacitación para que puedas agregar productos, modificar precios, administrar inventario y procesar pedidos de forma autónoma.',
      order: 3,
    },
    {
      question: '¿El desarrollo incluye optimización SEO y diseño adaptado a celulares?',
      answer: 'Sí. Todos nuestros desarrollos incluyen diseño 100% responsivo (adaptado a celulares, tablets y computadoras), optimización de velocidad de carga, estructuración de etiquetas HTML semánticas y configuración SEO On-Page para asegurar un posicionamiento orgánico óptimo en Google.',
      order: 4,
    },
    {
      question: '¿Ofrecen servicio de soporte y mantenimiento web luego del lanzamiento?',
      answer: 'Sí. Contamos con planes de soporte técnico continuo, copias de seguridad periódicas, actualizaciones de seguridad, monitoreo de disponibilidad y optimización constante para que no tengas que preocuparte por aspectos técnicos.',
      order: 5,
    },
  ]

  const existingFaqs = await payload.find({ collection: 'faqs', limit: 100 })
  if (existingFaqs.docs.length === 0) {
    for (const faq of faqsData) {
      await payload.create({
        collection: 'faqs',
        data: faq,
      })
    }
    console.log(`✓ ${faqsData.length} FAQs creadas.`)
  } else {
    console.log(`✓ Colección de FAQs ya contiene ${existingFaqs.docs.length} registros.`)
  }

  console.log('--- SEEDING COMPLETADO CON ÉXITO ---')
}

seedDatabase()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error al ejecutar seeding:', err)
    process.exit(1)
  })
