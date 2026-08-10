"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "¿Cuánto tiempo demora el desarrollo de una web corporativa o tienda online?",
      answer:
        "Los plazos varían según el alcance del proyecto. Una landing page o sitio corporativo en WordPress suele tomar entre 1 y 2 semanas. Una tienda online completa en WooCommerce toma entre 2 y 4 semanas, mientras que un desarrollo de software personalizado en Next.js depende de la complejidad de la arquitectura (usualmente de 3 a 6 semanas).",
    },
    {
      question: "¿Qué diferencia existe entre un sitio en WordPress y una web en Next.js?",
      answer:
        "WordPress es ideal para empresas que buscan un gestor de contenidos 100% autogestionable con un panel de control intuitivo. Next.js es una tecnología basada en React diseñada para proyectos que exigen la máxima velocidad de carga posible, puntaje perfecto en Google Core Web Vitals, seguridad avanzada y arquitectura desacoplada.",
    },
    {
      question: "¿Puedo administrar el catálogo y los pedidos de mi tienda WooCommerce yo mismo?",
      answer:
        "¡Totalmente! En Krylosys entregamos todas las tiendas WooCommerce configuradas con un panel administrativo amigable. Además, brindamos capacitación para que puedas agregar productos, modificar precios, administrar inventario y procesar pedidos de forma autónoma.",
    },
    {
      question: "¿El desarrollo incluye optimización SEO y diseño adaptado a celulares?",
      answer:
        "Sí. Todos nuestros desarrollos incluyen diseño 100% responsivo (adaptado a celulares, tablets y computadoras), optimización de velocidad de carga, estructuración de etiquetas HTML semánticas y configuración SEO On-Page para asegurar un posicionamiento orgánico óptimo en Google.",
    },
    {
      question: "¿Ofrecen servicio de soporte y mantenimiento web luego del lanzamiento?",
      answer:
        "Sí. Contamos con planes de soporte técnico continuo, copias de seguridad periódicas, actualizaciones de seguridad, monitoreo de disponibilidad y optimización constante para que no tengas que preocuparte por aspectos técnicos.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-20 md:py-28 relative bg-slate-50/60 dark:bg-[#060913]/90 border-t border-slate-200/80 dark:border-slate-800/80"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div data-aos="fade-up" className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-500" aria-hidden="true" />
            Preguntas Frecuentes
          </div>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Resolvemos tus dudas sobre <span className="text-gradient-krylosys">desarrollo web y software</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Respuestas claras sobre nuestros procesos de trabajo, tecnologías y metodologías de entrega.
          </p>
        </div>

        {/* Glassmorphism FAQ Accordion List - Single Parent AOS Animation */}
        <div data-aos="fade-up" data-aos-delay="100" className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl transition-all duration-200 border ${
                  isOpen
                    ? "glass-panel border-cyan-500/50 shadow-lg shadow-cyan-500/10"
                    : "glass-card-pro hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none rounded-2xl"
                >
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {faq.question}
                  </h3>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? "bg-cyan-500/20 text-cyan-500 rotate-180"
                        : "glass-pill text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" aria-hidden="true" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
