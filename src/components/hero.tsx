import React from "react";
import { ArrowRight, Code2, Globe, ShoppingCart, Zap, Sparkles, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Hero() {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    siteConfig.contact.whatsappDefaultMessage
  )}`;

  return (
    <section id="inicio" aria-labelledby="hero-heading" className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Dynamic Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          
          {/* Top Cyber Badge */}
          <div data-aos="fade-down" className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs sm:text-sm font-semibold shadow-lg shadow-cyan-500/10">
            <Sparkles className="w-4 h-4 text-cyan-500 animate-pulse" aria-hidden="true" />
            <span>Desarrollo de Software & Soluciones Web de Alto Rendimiento</span>
          </div>

          {/* Main H1 Headline */}
          <h1
            id="hero-heading"
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]"
          >
            Construimos tu presencia digital con{" "}
            <span className="text-gradient-krylosys drop-shadow-[0_0_25px_rgba(0,200,255,0.3)]">
              tecnología de vanguardia
            </span>
          </h1>

          {/* Subtitle */}
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed"
          >
            Expertos en sitios corporativos en WordPress, tiendas online WooCommerce, landing pages ultrarrápidas en Next.js y desarrollo de software a medida.
          </p>

          {/* Key Value Points */}
          <div data-aos="fade-up" data-aos-delay="250" className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 pt-2">
            <div className="flex items-center gap-1.5 glass-pill px-3 py-1.5 rounded-full">
              <CheckCircle2 className="w-4 h-4 text-cyan-500" aria-hidden="true" />
              <span>Optimización SEO y Core Web Vitals</span>
            </div>
            <div className="flex items-center gap-1.5 glass-pill px-3 py-1.5 rounded-full">
              <CheckCircle2 className="w-4 h-4 text-cyan-500" aria-hidden="true" />
              <span>100% Responsivo y Adaptable</span>
            </div>
            <div className="flex items-center gap-1.5 glass-pill px-3 py-1.5 rounded-full">
              <CheckCircle2 className="w-4 h-4 text-cyan-500" aria-hidden="true" />
              <span>Soporte Técnico Continuo</span>
            </div>
          </div>

          {/* CTA Action Buttons */}
          <div data-aos="fade-up" data-aos-delay="300" className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#contacto"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <span>Iniciar Proyecto</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl glass-pill hover:bg-slate-200/60 dark:hover:bg-slate-800/80 text-slate-900 dark:text-white font-bold text-base border border-slate-300 dark:border-cyan-500/30 transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <span>Hablar por WhatsApp</span>
            </a>
          </div>

          {/* Floating Technology Feature Chips */}
          <div
            data-aos="zoom-in"
            data-aos-delay="400"
            className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            <div className="p-4 rounded-2xl glass-card-pro flex items-center gap-3 hover:border-cyan-500/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Globe className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900 dark:text-white">WordPress</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Corporativo</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-card-pro flex items-center gap-3 hover:border-cyan-500/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShoppingCart className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900 dark:text-white">WooCommerce</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Tiendas Online</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-card-pro flex items-center gap-3 hover:border-cyan-500/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900 dark:text-white">Next.js & React</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Landings Ultra-fast</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-card-pro flex items-center gap-3 hover:border-cyan-500/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Code2 className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900 dark:text-white">Software</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">A Medida</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
