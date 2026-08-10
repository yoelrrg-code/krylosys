import React from "react";
import { Logo } from "./logo";
import { siteConfig } from "@/config/site";
import { ArrowUp, Globe2, Share2 } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer data-aos="fade-up" className="bg-slate-100/80 dark:bg-[#04060E] text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80 pt-16 pb-12 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-200 dark:border-slate-800/60">
          
          {/* Brand Info (Span 5) */}
          <div className="md:col-span-5 space-y-4">
            <a href="#inicio" className="inline-block focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-lg p-1">
              <Logo className="h-9" />
            </a>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed font-medium">
              Empresa de desarrollo de software especializada en sitios corporativos en WordPress, tiendas WooCommerce, webs ultrarrápidas en Next.js y soluciones a medida.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Perfil de LinkedIn de Krylosys"
                className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 flex items-center justify-center shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <Share2 className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Perfil de GitHub de Krylosys"
                className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 flex items-center justify-center shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <Globe2 className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links (Span 3) */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Navegación</h3>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <a href="#inicio" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Inicio</a>
              </li>
              <li>
                <a href="#nosotros" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Nosotros</a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Servicios</a>
              </li>
              <li>
                <a href="#proyectos" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Proyectos</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Preguntas Frecuentes</a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Contacto</a>
              </li>
            </ul>
          </div>

          {/* Services (Span 4) */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Especialidades</h3>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                <span>Sitios Corporativos WordPress</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                <span>Tiendas Online WooCommerce</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                <span>Landings & Webs en Next.js</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                <span>Desarrollo de Software a Medida</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits & Back To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold">
          <p>© {currentYear} {siteConfig.name}. Todos los derechos reservados.</p>
          
          <a
            href="#inicio"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 shadow-sm transition-all"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>

      </div>
    </footer>
  );
}
