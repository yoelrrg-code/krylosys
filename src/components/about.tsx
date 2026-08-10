import React from "react";
import { ShieldCheck, Cpu, Layers, Rocket } from "lucide-react";

export function About() {
  return (
    <section
      id="nosotros"
      aria-labelledby="about-heading"
      className="py-20 md:py-28 relative overflow-hidden bg-slate-50/60 dark:bg-[#060913]/90 border-y border-slate-200/80 dark:border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div data-aos="fade-up" className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
            Nosotros
          </div>
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight"
          >
            En <span className="text-gradient-krylosys">Krylosys</span> convertimos necesidades complejas en desarrollo simple y efectivo.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Somos un equipo especializado en desarrollo de software y presencia digital de alto impacto para empresas y negocios que exigen soluciones robustas, rápidas y escalables.
          </p>
        </div>

        {/* Glassmorphism Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Bento Feature Glass Panel (Span 8) */}
          <div
            data-aos="fade-right"
            data-aos-delay="100"
            className="md:col-span-8 p-8 md:p-10 rounded-3xl glass-panel glow-border-cyan relative overflow-hidden group flex flex-col justify-between shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-500" aria-hidden="true" />
            
            <div>
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 text-cyan-500 flex items-center justify-center mb-6 ring-1 ring-cyan-500/30">
                <Cpu className="w-7 h-7" aria-hidden="true" />
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
                Arquitectura de Software & Rendimiento de Élite
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed max-w-2xl">
                Diseñamos y programamos con las mejores prácticas de la industria: componentes modulares, optimización SEO de primer nivel, tiempos de respuesta ultra rápidos y cero sobrecarga innecesaria.
              </p>
            </div>

            {/* Metrics Counter Bar */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-cyan-500 dark:text-cyan-400">100%</div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold">Garantía de Calidad</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">+50</div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold">Proyectos Entregados</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">24/7</div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold">Soporte Técnico</div>
              </div>
            </div>
          </div>

          {/* Secondary Glass Bento Card (Span 4) */}
          <div
            data-aos="fade-left"
            data-aos-delay="200"
            className="md:col-span-4 p-8 rounded-3xl glass-card-pro shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center mb-6">
                <Layers className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                Soluciones Multi-Tecnología
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Seleccionamos la tecnología perfecta para tu caso: desde sitios autogestionables en WordPress y WooCommerce hasta webs en Next.js.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
              ✓ Flexibilidad Total
            </div>
          </div>

          {/* Third Glass Bento Card (Span 6) */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="md:col-span-6 p-8 rounded-3xl glass-card-pro shadow-xl hover:shadow-2xl transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Seguridad & Mantenimiento Continuo
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Protegemos tu plataforma con protocolos de seguridad, parches periódicos, respaldos y soporte preventivo para garantizar disponibilidad 99.9%.
            </p>
          </div>

          {/* Fourth Glass Bento Card (Span 6) */}
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="md:col-span-6 p-8 rounded-3xl glass-card-pro shadow-xl hover:shadow-2xl transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center mb-6">
              <Rocket className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Enfoque Orientado a Conversión & Ventas
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Cada diseño se concibe con técnicas de UX orientadas a captar clientes, optimizar embudos de ventas y convertir visitas en oportunidades de negocio.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
