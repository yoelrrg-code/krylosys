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
import {
  getHeroData,
  getAboutData,
  getServicesHeaderData,
  getProjectsHeaderData,
  getFaqsHeaderData,
  getContactData,
  getServicesData,
  getProjectsData,
  getFaqsData,
} from "@/lib/payload";

export const revalidate = 0;

export default async function Home() {
  const [
    heroData,
    aboutData,
    servicesHeaderData,
    projectsHeaderData,
    faqsHeaderData,
    contactData,
    servicesData,
    projectsData,
    faqsData,
  ] = await Promise.all([
    getHeroData(),
    getAboutData(),
    getServicesHeaderData(),
    getProjectsHeaderData(),
    getFaqsHeaderData(),
    getContactData(),
    getServicesData(),
    getProjectsData(),
    getFaqsData(),
  ]);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <AOSProvider>
        <main
          id="main-content"
          className="min-h-screen bg-slate-50 dark:bg-[#060913] text-slate-900 dark:text-slate-100 selection:bg-cyan-500 selection:text-white transition-colors duration-300 overflow-x-clip"
        >
          <Navbar contactData={contactData} />
          <Hero data={heroData} contactData={contactData} />
          <About data={aboutData} />
          <Services headerData={servicesHeaderData} data={servicesData} contactData={contactData} />
          <Projects headerData={projectsHeaderData} data={projectsData} />
          <FAQ headerData={faqsHeaderData} data={faqsData} />
          <Contact contactData={contactData} />
          <Footer />
        </main>
      </AOSProvider>
    </ThemeProvider>
  );
}
