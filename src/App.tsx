import { lazy, Suspense, useState } from 'react';
import { Toaster } from 'sonner';
import ErrorBoundary from '@/components/ErrorBoundary';
import SkeletonSection from '@/components/Skeleton';
import LoadingScreen from '@/components/LoadingScreen';
import ScrollProgress from '@/components/ScrollProgress';
import BackgroundEffects from '@/components/BackgroundEffects';
import Navigation from '@/components/Navigation';
import SideNav from '@/components/SideNav';
import Identity from '@/components/Identity';
import Process from '@/components/Process';
import Proof from '@/components/Proof/Proof';
import Trust from '@/components/Trust';
import Thoughts from '@/components/Thoughts';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Hero = lazy(() => import('@/components/Hero'));

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ErrorBoundary>
      <LoadingScreen onComplete={() => setLoading(false)} />

      {!loading && (
        <>
          <ScrollProgress />
          <BackgroundEffects />
          <Navigation />
          <SideNav />

          <main id="main">
            {/* Hero: lazy-loaded with skeleton fallback for perceived performance */}
            <Suspense
              fallback={
                <section
                  id="hero"
                  className="min-h-screen flex flex-col items-center justify-center relative"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(255,234,0,0.04) 0%, var(--brutal-void) 70%)',
                  }}
                >
                  {/* Skeleton shimmer while Three.js loads */}
                  <div className="skeleton" style={{ width: 'clamp(20rem, 50vw, 40rem)', height: '3rem', marginBottom: '1.5rem' }} />
                  <div className="skeleton" style={{ width: 'clamp(16rem, 40vw, 32rem)', height: '1.5rem', marginBottom: '2rem' }} />
                  <SkeletonSection rows={2} />
                </section>
              }
            >
              <Hero />
            </Suspense>

            {/* content-visibility: auto on sections below fold for free rendering perf */}
            <div className="section-below-fold">
              <Identity />
            </div>

            <div className="section-below-fold">
              <Process />
            </div>

            <div className="section-below-fold">
              <Proof />
            </div>

            <div className="section-below-fold">
              <Trust />
            </div>

            <div className="section-below-fold">
              <Thoughts />
            </div>

            <div className="section-below-fold">
              <Contact />
            </div>
          </main>

          <Footer />

          <Toaster
            position="bottom-right"
            richColors
            toastOptions={{
              style: {
                background: 'var(--brutal-surface)',
                border: 'var(--border-thin)',
                color: 'var(--brutal-border)',
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 600,
              },
              }}
          />
        </>
      )}
    </ErrorBoundary>
  );
}
