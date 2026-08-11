"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Logo } from "./logo";
import { Sun, Moon, Menu, X, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";

interface NavbarProps {
  contactData?: {
    whatsappNumber?: string | null;
  } | null;
}

export function Navbar({ contactData }: NavbarProps = {}) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    // Schedule setMounted asynchronously to prevent synchronous cascading renders warning
    const timer = setTimeout(() => setMounted(true), 0);

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);

          // Section intersection observer
          const sections = ["inicio", "nosotros", "servicios", "proyectos", "faq", "contacto"];
          const current = sections.find((sec) => {
            const el = document.getElementById(sec);
            if (el) {
              const rect = el.getBoundingClientRect();
              return rect.top <= 140 && rect.bottom >= 140;
            }
            return false;
          });

          if (current) {
            setActiveSection((prev) => (prev === current ? prev : current));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Inicio", href: "#inicio", id: "inicio" },
    { name: "Nosotros", href: "#nosotros", id: "nosotros" },
    { name: "Servicios", href: "#servicios", id: "servicios" },
    { name: "Proyectos", href: "#proyectos", id: "proyectos" },
    { name: "FAQ", href: "#faq", id: "faq" },
    { name: "Contacto", href: "#contacto", id: "contacto" },
  ];

  const whatsappNumber = contactData?.whatsappNumber || siteConfig.contact.whatsappNumber;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    siteConfig.contact.whatsappDefaultMessage
  )}`;

  const isDark = mounted ? resolvedTheme === "dark" : true;

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-2xl backdrop-saturate-150 bg-white/90 dark:bg-[#060913]/85 border-b border-slate-200 dark:border-cyan-500/25 shadow-md shadow-slate-200/50 dark:shadow-cyan-500/5 py-1"
          : "bg-transparent py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16 md:h-20 gap-2">
          {/* Brand Logo */}
          <a href="#inicio" className="flex items-center gap-1.5 sm:gap-2 group focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-lg p-0.5 sm:p-1 shrink-0">
            <Logo className="h-7 sm:h-8 md:h-10 transition-transform group-hover:scale-105 duration-200" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 p-1.5 rounded-full bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200 dark:border-cyan-500/25 shadow-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveSection(link.id)}
                  className={`relative px-3.5 py-1.5 text-xs lg:text-sm font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-full ${
                    isActive
                      ? "text-cyan-600 dark:text-cyan-400"
                      : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-cyan-500/40"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Switcher Toggle - Hydration Safe */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 border border-slate-200 dark:border-slate-700/60 hover:scale-105 active:scale-95 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              aria-label="Cambiar tema claro u oscuro"
              title="Cambiar tema claro u oscuro"
            >
              {mounted && isDark ? (
                <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 dark:text-slate-300" aria-hidden="true" />
              )}
            </button>

            {/* Direct WhatsApp CTA Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-md shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-200 active:scale-95 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              aria-label="Cambiar tema"
            >
              {mounted && isDark ? (
                <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 dark:text-slate-300" aria-hidden="true" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Cerrar menú principal" : "Abrir menú principal"}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden w-full backdrop-blur-2xl bg-white/95 dark:bg-[#060913]/95 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-3 shadow-2xl overflow-hidden">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => {
                setActiveSection(link.id);
                setMobileMenuOpen(false);
              }}
              className="block px-4 py-2.5 rounded-lg text-base font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-cyan-600 dark:hover:text-cyan-400"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm shadow-md"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Contactar por WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
