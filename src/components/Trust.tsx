import { useState, useEffect, useCallback, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-setup';
import { Quote, Star } from 'lucide-react';
import { testimonials } from '@/lib/data';

export default function Trust() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const slideRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  // GSAP slide transition on testimonial change
  useGSAP(() => {
    if (!slideRef.current) return;
    const slide = slideRef.current;

    // Build a timeline: slide out → set new content → slide in
    const tl = gsap.timeline();

    // Stars scale stagger animation
    const stars = slide.querySelectorAll('.trust-star');
    if (stars.length > 0) {
      tl.from(stars, {
        scale: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: 'back.out(1.4)',
      }, '+=0.1');
    }

    // Quote text reveal with clip-path wipe
    const quoteText = slide.querySelector('.trust-quote-text');
    if (quoteText) {
      tl.from(quoteText, {
        clipPath: 'inset(0 100% 0 0)',
        duration: 0.6,
        ease: 'expo.inOut',
      }, '-=0.1');
    }

    // Source info fades in
    const sourceInfo = slide.querySelector('.trust-source');
    if (sourceInfo) {
      tl.from(sourceInfo, {
        opacity: 0,
        y: 10,
        duration: 0.4,
        ease: 'power2.out',
      }, '-=0.3');
    }
  }, { scope: sectionRef, dependencies: [current] });

  // Section header scroll animation
  useGSAP(() => {
    gsap.from('.trust-header', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.trust-header',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: sectionRef });

  const testimonial = testimonials[current];

  return (
    <section id="trust" ref={sectionRef} className="py-24 md:py-32 lg:py-40 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h2
          className="trust-header section-h2 text-center mb-16"
          style={{ color: 'var(--brutal-border)' }}
        >
          WHAT CLIENTS SAY
        </h2>

        {/* Carousel */}
        <div
          className="relative p-8 md:p-12"
          style={{
            background: 'var(--brutal-surface)',
            border: 'var(--border-thick)',
            boxShadow: 'var(--shadow-brutal-lg)',
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          aria-live="polite"
        >
          <div ref={slideRef}>
            {/* Quote icon */}
            <Quote size={32} style={{ color: 'var(--brutal-yellow)', marginBottom: '1rem' }} />

            {/* Quote text */}
            <p
              className="trust-quote-text text-lg md:text-xl italic leading-relaxed mb-6"
              style={{ color: 'var(--brutal-border)' }}
            >
              &ldquo;{testimonial.quote}&rdquo;
            </p>

            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: testimonial.stars }).map((_, i) => (
                <Star
                  key={`${current}-${i}`}
                  className="trust-star"
                  size={16}
                  fill="var(--brutal-orange)"
                  style={{ color: 'var(--brutal-orange)' }}
                />
              ))}
            </div>

            {/* Source */}
            <div className="trust-source flex items-center gap-3">
              {/* Gradient initials avatar */}
              <div
                className="w-10 h-10 flex items-center justify-center text-xs font-bold"
                style={{
                  background: 'linear-gradient(135deg, var(--brutal-yellow), var(--brutal-cyan))',
                  color: 'var(--brutal-void)',
                }}
              >
                {testimonial.initials}
              </div>
              <div>
                <h3 className="subheading-h3 text-sm" style={{ color: 'var(--brutal-border)' }}>
                  {testimonial.source}
                </h3>
                <p className="label-text" style={{ color: 'var(--brutal-text-muted)' }}>
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className="w-8 h-2 min-h-[44px] transition-all duration-150 interactive-press"
                style={{
                  background: i === current ? 'var(--brutal-yellow)' : 'var(--brutal-text-muted)',
                  opacity: i === current ? 1 : 0.4,
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
