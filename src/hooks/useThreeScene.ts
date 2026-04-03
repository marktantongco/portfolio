import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function useThreeScene(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const prefersReducedMotion = useReducedMotion();
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    composer: EffectComposer;
    shapes: THREE.Mesh[];
    mouse: THREE.Vector2;
    animationId: number;
    particles: THREE.Points | null;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const isMobile = window.innerWidth < 768;
    const particleCount = (navigator.hardwareConcurrency || 4) < 4 ? 1000 : 3000;
    const useBloom = (navigator.hardwareConcurrency || 4) >= 4;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.02);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0a0a0a, 1);

    // Particles
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;
    }
    particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xFFEA00,
      size: 0.03,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 8 Floating shapes
    const geometries = [
      new THREE.TorusGeometry(0.3, 0.1, 16, 32),
      new THREE.OctahedronGeometry(0.3),
      new THREE.IcosahedronGeometry(0.3),
      new THREE.BoxGeometry(0.4, 0.4, 0.4),
      new THREE.ConeGeometry(0.25, 0.5, 16),
      new THREE.SphereGeometry(0.25, 16, 16),
      new THREE.DodecahedronGeometry(0.3),
      new THREE.CylinderGeometry(0.2, 0.2, 0.5, 16),
    ];

    const colors = [0xFFEA00, 0x00ffff, 0xFF0080, 0xFFD700, 0xccff00, 0xFF6B00, 0x00FF66, 0xFF0033];
    const shapes: THREE.Mesh[] = [];

    geometries.forEach((geo, i) => {
      const material = new THREE.MeshStandardMaterial({
        color: colors[i],
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      });
      const mesh = new THREE.Mesh(geo, material);
      mesh.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4 - 2
      );
      mesh.userData = {
        floatSpeed: 0.5 + Math.random() * 0.5,
        floatOffset: Math.random() * Math.PI * 2,
        rotSpeed: 0.005 + Math.random() * 0.01,
      };
      scene.add(mesh);
      shapes.push(mesh);
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xFFEA00, 1, 50);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // Grid
    const grid = new THREE.GridHelper(20, 20, 0x222222, 0x1a1a1a);
    grid.rotation.x = 0;
    grid.position.y = -3;
    scene.add(grid);

    // Post-processing
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    if (useBloom) {
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(canvas.clientWidth, canvas.clientHeight),
        0.8, // strength
        0.4, // radius
        0.6  // threshold
      );
      composer.addPass(bloomPass);
    }

    // Mouse tracking
    const mouse = new THREE.Vector2(0, 0);
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Particle wave
      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + positions[i] * 0.5) * 0.001;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Camera follow mouse
      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      // Animate shapes
      shapes.forEach((shape) => {
        const { floatSpeed, floatOffset, rotSpeed } = shape.userData;
        shape.position.y += Math.sin(time * floatSpeed + floatOffset) * 0.003;
        shape.rotation.x += rotSpeed;
        shape.rotation.y += rotSpeed * 0.5;
      });

      // Rotate grid
      grid.rotation.y = time * 0.02;

      // Render
      if (useBloom) {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }
    };

    animate();

    // Store ref
    sceneRef.current = { scene, camera, renderer, composer, shapes, mouse, animationId, particles };

    // Resize handler
    const handleResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      geometries.forEach((g) => g.dispose());
      shapes.forEach((s) => {
        (s.material as THREE.Material).dispose();
      });
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [prefersReducedMotion]);

  return sceneRef;
}
