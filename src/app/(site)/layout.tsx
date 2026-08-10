import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import React from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Structured Data: ProfessionalService
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.domain}/#organization`,
    name: siteConfig.name,
    url: siteConfig.domain,
    logo: `${siteConfig.domain}/logo.png`,
    description: siteConfig.description,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "AR",
    },
    sameAs: [siteConfig.social.linkedin, siteConfig.social.github],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de Desarrollo de Software",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sitios Corporativos en WordPress",
            description: "Desarrollo de sitios web corporativos dinámicos y autogestionables en WordPress.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Tiendas Online con WooCommerce",
            description: "Creación de tiendas e-commerce optimizadas para ventas en WooCommerce.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Landings y Webs en Next.js",
            description: "Desarrollo de aplicaciones web y landings ultrarrápidas con React y Next.js.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Desarrollo de Software a Medida",
            description: "Construcción de sistemas, APIs e integraciones personalizadas.",
          },
        },
      ],
    },
  };

  // JSON-LD Structured Data: FAQPage for Rich Search Snippets
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cuánto tiempo demora el desarrollo de una web corporativa o tienda online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Los plazos varían según el alcance del proyecto. Una landing page o sitio corporativo en WordPress toma entre 1 y 2 semanas. Una tienda WooCommerce toma de 2 a 4 semanas, y desarrollos a medida en Next.js de 3 a 6 semanas.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué diferencia existe entre un sitio en WordPress y una web en Next.js?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "WordPress es ideal para sitios 100% autogestionables con un panel amigable. Next.js es una tecnología React diseñada para máxima velocidad de carga, SEO avanzado y arquitectura desacoplada.",
        },
      },
      {
        "@type": "Question",
        name: "¿Puedo administrar el catálogo y los pedidos de mi tienda WooCommerce yo mismo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. Entregamos todas las tiendas WooCommerce configuradas con un panel administrativo intuitivo y capacitación para gestionar productos, precios e inventario.",
        },
      },
    ],
  };

  return (
    <html lang="es" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className={`${inter.className} antialiased selection:bg-cyan-500 selection:text-white`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-cyan-500 text-white rounded-lg font-bold shadow-lg focus:outline-none"
        >
          Saltar al contenido principal
        </a>
        {children}
      </body>
    </html>
  );
}
