import { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { cn } from '@/lib/utils';

const codeTabs = [
  {
    id: 'react',
    label: 'REACT',
    language: 'tsx' as const,
    code: `import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface ParticleSystemProps {
  count?: number;
  color?: string;
  speed?: number;
}

export default function ParticleSystem({
  count = 1000,
  color = '#FFEA00',
  speed = 0.5,
}: ParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      size: Math.random() * 3 + 1,
    }));

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.fillStyle = color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
      if (isRunning) animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [count, color, speed, isRunning]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="w-full h-auto"
    />
  );
}`,
  },
  {
    id: 'threejs',
    label: 'THREE.JS',
    language: 'typescript' as const,
    code: `import * as THREE from 'three';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass';

// Create the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Particles
const particleCount = 3000;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 20;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  size: 0.02,
  color: 0xFFEA00,
  transparent: true,
  blending: THREE.AdditiveBlending,
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// Shapes
const shapes = [
  new THREE.TorusGeometry(1, 0.3, 16, 100),
  new THREE.OctahedronGeometry(0.8),
  new THREE.IcosahedronGeometry(0.7),
];

shapes.forEach((geo, i) => {
  const mat = new THREE.MeshStandardMaterial({
    color: [0x00ffff, 0xFF0080, 0xccff00][i],
    wireframe: true,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(
    (i - 1) * 4,
    Math.sin(i) * 2,
    0
  );
  scene.add(mesh);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  particles.rotation.y += 0.001;
  renderer.render(scene, camera);
}
animate();`,
  },
  {
    id: 'creative',
    label: 'CREATIVE',
    language: 'typescript' as const,
    code: `// Generative Art: Noise-driven grid distortion
class GridDistortion {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private resolution: number;
  private noiseScale: number;

  constructor(
    canvas: HTMLCanvasElement,
    resolution = 20,
    noiseScale = 0.01
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.resolution = resolution;
    this.noiseScale = noiseScale;
  }

  private noise(x: number, y: number): number {
    const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
    return n - Math.floor(n);
  }

  render(time: number) {
    const { ctx, canvas, resolution, noiseScale } = this;
    const cellW = canvas.width / resolution;
    const cellH = canvas.height / resolution;

    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < resolution; x++) {
      for (let y = 0; y < resolution; y++) {
        const noiseVal = this.noise(
          x * noiseScale + time * 0.001,
          y * noiseScale + time * 0.001
        );
        const distortion = noiseVal * 20;
        const size = Math.max(1, cellW * 0.8 * (1 - noiseVal * 0.5));

        const hue = (noiseVal * 60 + time * 0.05) % 360;
        ctx.fillStyle = \`hsl(\${hue}, 100%, 50%)\`;
        ctx.fillRect(
          x * cellW + distortion,
          y * cellH + distortion,
          size,
          size
        );
      }
    }
  }

  animate() {
    let frame = 0;
    const loop = () => {
      this.render(frame);
      frame++;
      requestAnimationFrame(loop);
    };
    loop();
  }
}

// Initialize
const canvas = document.getElementById('art') as HTMLCanvasElement;
const art = new GridDistortion(canvas, 30, 0.02);
art.animate();`,
  },
];

export default function CodeShowcase() {
  const [activeTab, setActiveTab] = useState('react');
  const current = codeTabs.find((t) => t.id === activeTab) || codeTabs[0];

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {codeTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-3 py-1.5 text-xs font-semibold tracking-wide uppercase cursor-pointer transition-all duration-150 min-h-[44px] inline-flex items-center interactive-press'
            )}
            style={{
              background:
                activeTab === tab.id ? 'var(--brutal-yellow)' : 'transparent',
              color:
                activeTab === tab.id ? 'var(--brutal-void)' : 'var(--brutal-border)',
              border: 'var(--border-thin)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Code block */}
      <div
        className="brutal-card overflow-hidden"
        style={{ maxHeight: '500px', overflowY: 'auto' }}
      >
        <div
          className="flex items-center gap-2 px-4 py-2"
          style={{ borderBottom: 'var(--border-thin)' }}
        >
          <div
            className="w-3 h-3"
            style={{ background: 'var(--brutal-red)' }}
          />
          <div
            className="w-3 h-3"
            style={{ background: 'var(--brutal-yellow)' }}
          />
          <div
            className="w-3 h-3"
            style={{ background: 'var(--brutal-green)' }}
          />
          <span
            className="ml-2 text-xs font-mono"
            style={{ color: 'var(--brutal-text-muted)' }}
          >
            {current.id}.{current.language === 'tsx' ? 'tsx' : 'ts'}
          </span>
        </div>

        <Highlight theme={themes.nightOwl} code={current.code.trim()} language={current.language}>
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className="p-4 text-xs leading-relaxed overflow-x-auto"
              style={{ ...style, background: 'var(--brutal-void)' }}
            >
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line });
                return (
                  <div key={i} {...lineProps}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                );
              })}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
