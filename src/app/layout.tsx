import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: `${siteConfig.name} - Empresa de Desarrollo de Software, WordPress, WooCommerce & Next.js`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Krylosys",
    "Empresa de desarrollo de software",
    "Agencia de desarrollo web",
    "Sitios corporativos WordPress",
    "Tiendas online WooCommerce",
    "Landing pages Next.js",
    "Desarrollo de software a medida",
    "Desarrollo web React",
    "Optimización SEO y Core Web Vitals",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.domain }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.domain,
  },
  openGraph: {
    title: `${siteConfig.name} - Desarrollo de Software & Soluciones Web Corporativas`,
    description:
      "Transformamos tu negocio con sitios corporativos en WordPress, tiendas WooCommerce, webs ultrarrápidas en Next.js y desarrollo de software a medida.",
    url: siteConfig.domain,
    siteName: siteConfig.name,
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - Agencia de Desarrollo Web & Software`,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="scroll-smooth">
      <body suppressHydrationWarning className={`${inter.className} antialiased selection:bg-cyan-500 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
