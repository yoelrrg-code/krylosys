"use client";

import React, { useState } from "react";
import { MessageCircle, Mail, Send, CheckCircle2, Clock, MapPin, Sparkles, Loader2, Zap, Globe, ShoppingBag, Code } from "lucide-react";
import { siteConfig } from "@/config/site";

interface ContactProps {
  contactData?: {
    email?: string | null;
    phone?: string | null;
    whatsappNumber?: string | null;
    businessHours?: string | null;
  } | null;
}

export function Contact({ contactData }: ContactProps) {
  const email = contactData?.email || siteConfig.contact.email;
  const phone = contactData?.phone || siteConfig.contact.phone;
  const whatsappNumber = contactData?.whatsappNumber || siteConfig.contact.whatsappNumber;
  const businessHours = contactData?.businessHours || "Atención: Lunes a Viernes de 9:00 a 18:00 hs";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "nextjs",
    message: "",
    website_hp: "", // Honeypot antispam field
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", service: "nextjs", message: "", website_hp: "" });
      } else {
        setErrorMsg(data.error || "Ocurrió un error al enviar el formulario. Intenta nuevamente.");
      }
    } catch {
      setErrorMsg("Error de conexión con el servidor. Verifica tu internet e intentalo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hola Krylosys, quiero hacer una consulta comercial"
  )}`;

  const serviceChips = [
    { id: "nextjs", label: "Next.js / React", icon: Zap },
    { id: "wordpress", label: "WordPress", icon: Globe },
    { id: "woocommerce", label: "WooCommerce", icon: ShoppingBag },
    { id: "custom", label: "Software a Medida", icon: Code },
  ];

  return (
    <section id="contacto" aria-labelledby="contact-heading" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div data-aos="fade-up" className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider border border-cyan-500/20">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" aria-hidden="true" />
            Hablemos de tu Proyecto
          </div>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Contactate con <span className="text-gradient-krylosys">Krylosys</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Escribinos directamente a través del formulario o elegí tu medio de comunicación preferido.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Channels */}
          <div data-aos="fade-right" data-aos-delay="100" className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Card */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 hover:border-emerald-400 transition-all duration-200 flex items-center gap-5 group shadow-sm hover:shadow-md focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-7 h-7" aria-hidden="true" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Respuesta Rápida (&lt; 15 min)</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Escribinos por WhatsApp</h3>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1">{phone}</p>
              </div>
            </a>

            {/* Email Card */}
            <a
              href={`mailto:${email}`}
              className="p-6 rounded-3xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-500/30 hover:border-cyan-400 transition-all duration-200 flex items-center gap-5 group shadow-sm hover:shadow-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                <Mail className="w-7 h-7" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">Atención Comercial</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Enviar un Correo</h3>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1">{email}</p>
              </div>
            </a>

            {/* General Info Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <div className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Clock className="w-5 h-5 text-cyan-500 shrink-0" aria-hidden="true" />
                <span>{businessHours}</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                <MapPin className="w-5 h-5 text-cyan-500 shrink-0" aria-hidden="true" />
                <span>Desarrollo de software y servicios web globales</span>
              </div>
            </div>

          </div>

          {/* Right Column: Form Panel */}
          <div data-aos="fade-left" data-aos-delay="200" className="lg:col-span-7">
            <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
              
              {submitted ? (
                <div className="text-center py-12 space-y-6" role="status" aria-live="polite">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    ¡Mensaje Enviado con Éxito!
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    Gracias por escribirnos. Un especialista de Krylosys analizará tu consulta y te contactará en menos de 24 horas.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Envianos un mensaje
                  </h3>

                  {/* Accessible Error Banner */}
                  {errorMsg && (
                    <div role="alert" aria-live="polite" className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm font-semibold">
                      {errorMsg}
                    </div>
                  )}

                  {/* Hidden Honeypot Field for Antispam */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website_hp"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website_hp}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                        Nombre completo *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ej. Martín Gómez"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                        Correo electrónico *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ejemplo@empresa.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                        Teléfono / WhatsApp
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+54 9 11..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-service" className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                        Servicio de interés
                      </label>
                      <select
                        id="contact-service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium"
                      >
                        <option value="nextjs">Landings & Webs en Next.js</option>
                        <option value="wordpress">Sitio Corporativo WordPress</option>
                        <option value="woocommerce">Tienda Online WooCommerce</option>
                        <option value="custom">Desarrollo Personalizado</option>
                        <option value="other">Otro / Consulta General</option>
                      </select>
                    </div>
                  </div>

                  {/* Interactive Service Chips */}
                  <div>
                    <span className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                      Selección rápida de especialidad:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {serviceChips.map((chip) => (
                        <button
                          key={chip.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, service: chip.id })}
                          className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                            formData.service === chip.id
                              ? "bg-cyan-500/15 border-cyan-500 text-cyan-600 dark:text-cyan-400 shadow-sm"
                              : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                          }`}
                        >
                          <chip.icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span className="truncate">{chip.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                      Detalles del proyecto o consulta *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Contanos brevemente sobre tu empresa y qué estás buscando desarrollar..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-none font-medium"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-base shadow-lg shadow-cyan-500/25 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                        <span>Enviando consulta...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" aria-hidden="true" />
                        <span>Enviar Consulta</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
