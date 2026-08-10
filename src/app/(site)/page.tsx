import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { AOSProvider } from "@/components/aos-provider";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { Projects } from "@/components/projects";
import { FAQ } from "@/components/faq";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <AOSProvider>
        <main
          id="main-content"
          className="min-h-screen bg-slate-50 dark:bg-[#060913] text-slate-900 dark:text-slate-100 selection:bg-cyan-500 selection:text-white transition-colors duration-300"
        >
          <Navbar />
          <Hero />
          <About />
          <Services />
          <Projects />
          <FAQ />
          <Contact />
          <Footer />
        </main>
      </AOSProvider>
    </ThemeProvider>
  );
}
