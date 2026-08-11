import React from "react";
import { Globe, ShoppingBag, Zap, Code, Check, ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

interface ServicesProps {
  headerData?: {
    badge?: string | null;
    title?: string | null;
    description?: string | null;
  } | null;
  data?: any[] | null;
  contactData?: {
    whatsappNumber?: string | null;
  } | null;
}

export function Services({ headerData, data, contactData }: ServicesProps) {
  const whatsappNumber = contactData?.whatsappNumber || siteConfig.contact.whatsappNumber;

  const headerBadge = headerData?.badge || "Nuestras Soluciones";
  const headerTitle = headerData?.title || "Servicios adaptados a cada etapa de tu empresa";
  const headerDesc =
    headerData?.description ||
    "Ofrecemos el equilibrio perfecto entre tecnología moderna, usabilidad y retorno de inversión.";

  const defaultServices = [
    {
      id: "wordpress",
      icon: Globe,
      badge: "WordPress Corporate",
      score: "100% Autogestionable",
      title: "Sitios Corporativos en WordPress",
      description:
        "Desarrollamos sitios web profesionales, dinámicos y totalmente autogestionables para que puedas actualizar tu contenido sin depender de programadores.",
      features: [
        "Panel de administración fácil de usar",
        "Diseño adaptativo 100% responsivo",
        "Optimización de velocidad y SEO On-Page",
        "Integración de formularios y redes sociales",
      ],
      whatsappMsg: "Hola Krylosys, me interesa consultar por un sitio corporativo en WordPress.",
      highlight: false,
    },
    {
      id: "woocommerce",
      icon: ShoppingBag,
      badge: "E-Commerce",
      score: "Pagos & Inventario",
      title: "Tiendas Online con WooCommerce",
      description:
        "Creamos tu tienda virtual personalizada con WooCommerce: rápida, segura y lista para procesar pagos y gestionar tu catálogo de productos sin complicaciones.",
      features: [
        "Integración con Mercado Pago, Stripe y bancos",
        "Gestión de inventario y stock automatizado",
        "Cálculo automático de envíos y logística",
        "Diseño enfocado en tasa de conversión",
      ],
      whatsappMsg: "Hola Krylosys, quiero cotizar una tienda online en WooCommerce.",
      highlight: false,
    },
    {
      id: "nextjs",
      icon: Zap,
      badge: "Máxima Velocidad & SEO",
      score: "Score Lighthouse 99+",
      title: "Landings y Webs Corporativas en Next.js",
      description:
        "Aprovechamos el poder de Next.js y React para construir landing pages e hiper-sitios de altísima velocidad, máxima puntuación en Google Lighthouse y excelente posicionamiento SEO.",
      features: [
        "Tiempos de carga ultra rápidos (Core Web Vitals)",
        "SSR / SSG para SEO de nivel superior",
        "Diseño web moderno con microanimaciones",
        "Seguridad de nivel corporativo",
      ],
      whatsappMsg: "Hola Krylosys, me interesa una landing/web corporativa en Next.js.",
      highlight: true,
    },
    {
      id: "custom",
      icon: Code,
      badge: "Software a Medida",
      score: "Arquitectura Exclusiva",
      title: "Desarrollo Personalizado",
      description:
        "Construimos sistemas y plataformas web a la medida exacta de tus requerimientos operativos: paneles de control, APIs REST, automatizaciones e integraciones personalizadas.",
      features: [
        "Arquitectura de software escalable",
        "Integración de APIs de terceros",
        "Bases de datos optimizadas",
        "Paneles y dashboards administrativos",
      ],
      whatsappMsg: "Hola Krylosys, necesito asesoramiento para un desarrollo personalizado.",
      highlight: false,
    },
  ];

  const getIcon = (idx: number) => {
    const icons = [Globe, ShoppingBag, Zap, Code];
    return icons[idx % icons.length];
  };

  const servicesList =
    data && data.length > 0
      ? data.map((doc, idx) => ({
          id: doc.id || `service-${idx}`,
          icon: getIcon(idx),
          badge: doc.badge || "Servicio",
          score: doc.score || "Profesional",
          title: doc.title,
          description: doc.description,
          features: Array.isArray(doc.features)
            ? doc.features.map((f: any) => (typeof f === "string" ? f : f.feature))
            : [],
          whatsappMsg: doc.whatsappMsg || `Hola Krylosys, me interesa consultar por ${doc.title}`,
          highlight: Boolean(doc.highlight),
        }))
      : defaultServices;

  return (
    <section
      id="servicios"
      aria-labelledby="services-heading"
      className="py-20 md:py-28 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div data-aos="fade-up" className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" aria-hidden="true" />
            {headerBadge}
          </div>
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            {headerTitle}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {headerDesc}
          </p>
        </div>

        {/* Glassmorphism Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {servicesList.map((service, idx) => {
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              service.whatsappMsg
            )}`;

            return (
              <div
                key={service.id}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className={`relative rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between overflow-visible ${
                  service.highlight
                    ? "bg-white dark:bg-[#060D1E] border-2 border-cyan-500 dark:border-cyan-400 shadow-xl shadow-cyan-500/15 dark:shadow-[0_20px_50px_-10px_rgba(0,200,255,0.3)] text-slate-900 dark:text-white"
                    : "bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/80 text-slate-900 dark:text-white shadow-lg shadow-slate-200/60 dark:shadow-none hover:border-cyan-500/50 dark:hover:border-cyan-500/40"
                }`}
              >
                {/* Absolute Top-Right Floating Badge */}
                {service.highlight && (
                  <span className="absolute -top-4 right-6 z-20 px-3.5 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-extrabold tracking-wide shadow-lg shadow-cyan-500/30 ring-2 ring-white dark:ring-[#060913]">
                    ⚡ Recomendado para Máxima Velocidad
                  </span>
                )}

                <div>
                  {/* Header Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        service.highlight
                          ? "bg-cyan-500/15 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 dark:border-cyan-500/40 shadow-[0_0_20px_rgba(0,200,255,0.25)]"
                          : "bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-500"
                      }`}
                    >
                      <service.icon className="w-7 h-7" aria-hidden="true" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                          service.highlight
                            ? "bg-cyan-500/15 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-500/30 dark:border-cyan-500/40"
                            : "bg-slate-100 dark:bg-slate-800 text-cyan-700 dark:text-cyan-300 border-slate-200 dark:border-cyan-500/20"
                        }`}
                      >
                        {service.score}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-6 text-slate-600 dark:text-slate-300">
                    {service.description}
                  </p>

                  {/* Bullet Features */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feat: string, fIdx: number) => (
                      <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-200">
                        <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action Link */}
                <div
                  className={`pt-4 border-t ${
                    service.highlight ? "border-slate-200/80 dark:border-slate-800" : "border-slate-100 dark:border-slate-800/80"
                  }`}
                >
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors group focus:outline-none focus:underline"
                  >
                    <span>Consultar por este servicio</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
