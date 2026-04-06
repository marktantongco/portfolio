import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from '@/lib/gsap-setup';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';

function scramble(el: HTMLElement, finalText: string, duration = 800) {
  const chars = finalText.split('');
  const len = chars.length;
  let frame = 0;
  const total = Math.floor(duration / 30);

  const interval = setInterval(() => {
    frame++;
    let result = '';
    for (let i = 0; i < len; i++) {
      if (chars[i] === ' ') {
        result += ' ';
      } else if (frame > total - (len - i) * 1.5) {
        result += chars[i];
      } else {
        result += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
    }
    el.textContent = result;
    if (frame >= total) {
      clearInterval(interval);
      el.textContent = finalText;
    }
  }, 30);

  return interval;
}

export default function Hero() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Three.js particle field
  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 800 : 3000;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particles
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const neonColor = new THREE.Color(0xccff00);
    const cyanColor = new THREE.Color(0x00ffff);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const mix = Math.random();
      const c = neonColor.clone().lerp(cyanColor, mix);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.025 : 0.018,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Mouse tracking
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    let animId = 0;
    const animate = () => {
      mouse.x += (target.x - mouse.x) * 0.05;
      mouse.y += (target.y - mouse.y) * 0.05;

      points.rotation.y += 0.0008;
      points.rotation.x += 0.0003;
      camera.rotation.y = mouse.x * 0.15;
      camera.rotation.x = -mouse.y * 0.1;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [reduced]);

  // GSAP entrance timeline
  useEffect(() => {
    if (reduced) {
      // Just show everything immediately
      gsap.set('.hero-badge, .hero-name, .hero-sub, .hero-tagline, .scroll-indicator, .corner, .side-l, .side-r, .hero-glow, .scanline', {
        opacity: 1,
        clearProps: 'opacity',
      });
      return;
    }

    const tl = gsap.timeline({ delay: 2.2 });
    tlRef.current = tl;

    // Ambient glows
    tl.to('.hero-glow', { opacity: 1, duration: 1.5, stagger: 0.3 }, 0);

    // Corners — animate in from their respective corners using clipPath reveal
    const cornerAnims: { el: string; from: object }[] = [
      { el: '.corner.tl', from: { x: -40, y: -40, opacity: 0, clipPath: 'inset(0 100% 100% 0)' } },
      { el: '.corner.tr', from: { x: 40, y: -40, opacity: 0, clipPath: 'inset(0 0 100% 100%)' } },
      { el: '.corner.bl', from: { x: -40, y: 40, opacity: 0, clipPath: 'inset(100% 100% 0 0)' } },
      { el: '.corner.br', from: { x: 40, y: 40, opacity: 0, clipPath: 'inset(100% 0 0 100%)' } },
    ];
    cornerAnims.forEach((anim, i) => {
      tl.fromTo(anim.el, anim.from, { x: 0, y: 0, opacity: 1, clipPath: 'inset(0 0 0 0)', duration: 0.5, ease: 'power3.out' }, 0.2 + i * 0.1);
    });

    // Side lines
    tl.to('.side-l, .side-r', { height: 120, duration: 0.8, stagger: 0.2 }, 0.4);

    // Scanline
    tl.to('.scanline', { opacity: 1, duration: 0.6 }, 0.5);

    // Badge
    tl.to('.hero-badge', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.6);

    // Name with scramble
    tl.to('.hero-name', { opacity: 1, duration: 0.01 }, 1.0);
    tl.add(() => {
      const mark = document.getElementById('name-mark');
      const tantongco = document.getElementById('name-tantongco');
      if (mark) scramble(mark, 'MARK ANTHONY', 1000);
      if (tantongco) scramble(tantongco, 'TANTONGCO', 1000);
    }, 1.0);

    // Subtitle — slide up with opacity
    tl.fromTo('.hero-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 1.6);

    // Tagline — slide up with opacity
    tl.fromTo('.hero-tagline', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 1.9);

    // Shadow block — slide offset from 2px to 4px
    tl.fromTo('.shadow-block', { transform: 'translate(2px, 2px)' }, { transform: 'translate(4px, 4px)', duration: 0.4, ease: 'power2.out' }, 2.1);

    // Scroll indicator
    tl.to('.scroll-indicator', { opacity: 1, duration: 0.6 }, 2.2);

    return () => {
      tl.kill();
    };
  }, [reduced]);

  // Parallax on scroll with scale zoom-out
  useEffect(() => {
    if (reduced) return;
    const hero = document.querySelector('.hero-parallax');
    if (!hero) return;

    const onScroll = () => {
      const y = window.scrollY;
      const pct = y / window.innerHeight;
      const opacity = Math.max(0, 1 - pct * 1.5);
      const translateY = y * 0.3;
      const scale = 1 - pct * 0.1;
      gsap.set(hero, { y: translateY, opacity, scale });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduced]);

  const scrollToIdentity = () => {
    document.getElementById('identity')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero">
      <div id="hero-3d" ref={canvasRef} />

      {/* Overlay layers */}
      <div className="hero-glow g1" />
      <div className="hero-glow g2" />
      <div className="hero-grid" />
      <div className="hero-grad" />
      <div className="vignette" />
      <div className="scanline" />

      {/* Corners */}
      <div className="corners">
        <div className="corner tl" />
        <div className="corner tr" />
        <div className="corner bl" />
        <div className="corner br" />
      </div>

      {/* Side lines */}
      <div className="side-l" />
      <div className="side-r" />

      {/* Content */}
      <div className="hero-content hero-parallax">
        <div className="hero-badge">
          <span className="badge-dot" />
          <span className="badge-text">DEUS ACTIVE · Available for Projects</span>
        </div>

        <h1 className="hero-name">
          <span id="name-mark">MARK ANTHONY</span>
          <span className="line-neon" id="name-tantongco">TANTONGCO</span>
        </h1>

        <p className="hero-sub">AI Creative Technologist · Building Sentient Systems</p>

        <div className="hero-tagline">
          <div className="shadow-block" />
          <span className="inner">View Case Studies ↓</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" onClick={scrollToIdentity}>
        <div className="scroll-mouse">
          <div className="scroll-dot" />
        </div>
        <span>Scroll</span>
      </div>
    </section>
  );
}
