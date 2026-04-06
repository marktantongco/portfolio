import { useState, useCallback } from 'react';
import { useActiveSection } from '@/hooks/useActiveSection';
import { type Project, PROJECTS } from '@/lib/data';

import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import Identity from '@/components/Identity';
import Work from '@/components/Work';
import Services from '@/components/Services';
import Skills from '@/components/Skills';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CaseStudyModal from '@/components/CaseStudyModal';

export default function App() {
  const activeSection = useActiveSection();
  const [modalProject, setModalProject] = useState<Project | null>(null);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />
      <BackToTop />

      <main id="main">
        <Hero />
        <Ticker />
        <Identity />
        <Work onOpenModal={(i: number) => setModalProject(PROJECTS[i] ?? null)} />
        <Services />
        <Skills />
        <Process />
        <Testimonials />
        <Blog />
        <Contact />
      </main>

      <Footer />
      <CaseStudyModal project={modalProject} onClose={() => setModalProject(null)} />
    </>
  );
}
