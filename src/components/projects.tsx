"use client";

import React, { useState } from "react";
import { FolderGit2, ExternalLink, Code2 } from "lucide-react";

interface ProjectsProps {
  headerData?: {
    badge?: string | null;
    title?: string | null;
    description?: string | null;
  } | null;
  data?: any[] | null;
}

export function Projects({ headerData, data }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const headerBadge = headerData?.badge || "Casos de Éxito";
  const headerTitle = headerData?.title || "Portafolio de desarrollo & proyectos";
  const headerDesc =
    headerData?.description ||
    "Explorá algunos de los proyectos y soluciones desarrolladas para nuestros clientes.";

  const categories = [
    { id: "all", label: "Todos los Proyectos" },
    { id: "nextjs", label: "Next.js / React" },
    { id: "wordpress", label: "WordPress Corporativo" },
    { id: "woocommerce", label: "WooCommerce E-Commerce" },
    { id: "custom", label: "Software a Medida" },
  ];

  const categoryLabels: Record<string, string> = {
    nextjs: "Next.js & React",
    wordpress: "WordPress",
    woocommerce: "WooCommerce",
    custom: "Software a Medida",
  };

  const defaultProjects = [
    {
      id: 1,
      title: "FinTech Corporate Platform",
      category: "nextjs",
      categoryLabel: "Next.js & React",
      description: "Plataforma financiera corporativa desarrollada con Next.js 15, SSR y métricas en tiempo real.",
      techs: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      metrics: "Lighthouse Score 100",
      imageText: "Krylosys FinTech Cloud",
      url: "#contacto",
    },
    {
      id: 2,
      title: "Global E-Commerce Store",
      category: "woocommerce",
      categoryLabel: "WooCommerce",
      description: "Tienda online internacional con pasarelas de pago automatizadas e inventario en tiempo real.",
      techs: ["WooCommerce", "WordPress", "Mercado Pago", "PHP"],
      metrics: "+140% Conversión de Ventas",
      imageText: "Krylosys E-Commerce Store",
      url: "#contacto",
    },
    {
      id: 3,
      title: "Sitio Corporativo Institucional",
      category: "wordpress",
      categoryLabel: "WordPress",
      description: "Desarrollo institucional autogestionable optimizado para posicionamiento SEO orgánico en Google.",
      techs: ["WordPress", "SEO On-Page", "Autogestionable"],
      metrics: "Posicionamiento Top 3 Google",
      imageText: "Krylosys Corporate Hub",
      url: "#contacto",
    },
    {
      id: 4,
      title: "Dashboard de Gestión Operativa",
      category: "custom",
      categoryLabel: "Software a Medida",
      description: "Sistema web a medida con APIs REST, control de acceso por roles y reportes automatizados.",
      techs: ["React", "Node.js", "APIs REST", "PostgreSQL"],
      metrics: "Automatización 90% Operativa",
      imageText: "Krylosys Enterprise SaaS",
      url: "#contacto",
    },
  ];

  const projectsList =
    data && data.length > 0
      ? data.map((doc, idx) => ({
          id: doc.id || idx + 1,
          title: doc.title,
          category: doc.category || "custom",
          categoryLabel: categoryLabels[doc.category] || doc.category || "Proyecto",
          description: doc.description,
          techs: Array.isArray(doc.tags)
            ? doc.tags.map((t: any) => (typeof t === "string" ? t : t.tag))
            : [],
          metrics: doc.metrics || "Lighthouse Score 100",
          imageText: `Krylosys ${doc.title}`,
          url: doc.demoUrl || "#contacto",
        }))
      : defaultProjects;

  const filteredProjects =
    activeCategory === "all"
      ? projectsList
      : projectsList.filter((p) => p.category === activeCategory);

  return (
    <section
      id="proyectos"
      aria-labelledby="projects-heading"
      className="py-20 md:py-28 relative bg-slate-50/60 dark:bg-[#060913]/90 border-y border-slate-200/80 dark:border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div data-aos="fade-up" className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <FolderGit2 className="w-3.5 h-3.5 text-cyan-500" aria-hidden="true" />
            {headerBadge}
          </div>
          <h2
            id="projects-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            {headerTitle}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {headerDesc}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div data-aos="fade-up" data-aos-delay="100" className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 scale-105"
                  : "glass-pill text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              data-aos="zoom-in-up"
              data-aos-delay={idx * 100}
              className="group rounded-3xl bg-white dark:bg-slate-900/90 overflow-hidden border border-slate-200/90 dark:border-slate-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between shadow-lg shadow-slate-200/60 dark:shadow-none hover:shadow-xl"
            >
              <div>
                {/* Mac Window Frame Mockup */}
                <div className="bg-slate-100 dark:bg-slate-950 px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" aria-hidden="true" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" aria-hidden="true" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" aria-hidden="true" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-500 truncate max-w-[200px]">
                    https://krylosys.com/portfolio/{project.id}
                  </span>
                  <div className="w-4" />
                </div>

                {/* Simulated Screen Body - Theme Adaptive */}
                <div className="h-48 bg-gradient-to-br from-cyan-500/10 via-slate-100 to-slate-200/60 dark:from-slate-900 dark:via-slate-900 dark:to-[#060913] relative p-6 flex flex-col justify-between overflow-hidden group-hover:scale-[1.01] transition-transform duration-500 border-b border-slate-200/80 dark:border-slate-800">
                  <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/15 rounded-full blur-2xl group-hover:bg-cyan-500/30 transition-all" aria-hidden="true" />
                  
                  <div className="flex justify-between items-start z-10">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/15 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-bold border border-cyan-500/30">
                      {project.categoryLabel}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-900/10 dark:bg-white/10 text-slate-800 dark:text-white text-xs font-extrabold backdrop-blur-md border border-slate-900/10 dark:border-white/20">
                      {project.metrics}
                    </span>
                  </div>

                  <div className="z-10">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-mono font-medium">
                      {project.imageText}
                    </p>
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-6 space-y-4">
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.techs.map((tech: string, tIdx: number) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-4">
                <a
                  href={project.url}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors pt-4 group/link"
                >
                  <span>Solicitar proyecto similar</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio CTA - Theme Adaptive Gradient Button */}
        <div data-aos="fade-up" data-aos-delay="200" className="mt-16 text-center">
          <a
            href="#contacto"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <Code2 className="w-5 h-5 text-white" aria-hidden="true" />
            <span>¿Querés ver una demo personalizada para tu sector?</span>
          </a>
        </div>

      </div>
    </section>
  );
}
