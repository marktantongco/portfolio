import { useState, lazy, Suspense } from 'react';
import { Toaster } from 'sonner';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useCommandPalette } from '@/hooks/useCommandPalette';
import { type Project } from '@/lib/data';

// Shell components
import BackgroundEffects from '@/components/BackgroundEffects';
import ScrollProgress from '@/components/ScrollProgress';
import Navigation from '@/components/Navigation';
import SideNav from '@/components/SideNav';
import CommandPalette from '@/components/CommandPalette';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

// Content sections
import Identity from '@/components/Identity';
import Process from '@/components/Process';
import Proof from '@/components/Proof/Proof';
import Trust from '@/components/Trust';
import Thoughts from '@/components/Thoughts';
import Contact from '@/components/Contact';
import ProjectModal from '@/components/ProjectModal';

// Lazy-loaded Hero (most complex, loaded last)
const Hero = lazy(() => import('@/components/Hero'));

export default function App() {
  const { activeSection, scrollToSection } = useActiveSection();
  const { isOpen: paletteOpen, setIsOpen: setPaletteOpen } = useCommandPalette();
  const [modalProject, setModalProject] = useState<Project | null>(null);

  return (
    <>
      {/* Background effects layer */}
      <BackgroundEffects />

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Navigation system */}
      <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />
      <SideNav activeSection={activeSection} scrollToSection={scrollToSection} />
      <CommandPalette
        isOpen={paletteOpen}
        setIsOpen={setPaletteOpen}
        scrollToSection={scrollToSection}
        activeSection={activeSection}
      />

      {/* Main content */}
      <main id="main">
        {/* Hero — lazy loaded with loading screen */}
        <Suspense fallback={<LoadingScreen />}>
          <Hero />
        </Suspense>

        {/* Content sections */}
        <Identity />
        <Process />
        <Proof onOpenModal={setModalProject} />
        <Trust />
        <Thoughts />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Case study modal */}
      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />

      {/* Toast notifications */}
      <Toaster
        position="bottom-right"
        richColors
        toastOptions={{
          style: {
            background: 'var(--brutal-surface)',
            border: 'var(--border-thin)',
            color: 'var(--brutal-border)',
          },
        }}
      />
    </>
  );
}
