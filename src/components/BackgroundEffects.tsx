import { motion } from 'framer-motion';

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true">
      {/* Grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(var(--brutal-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--brutal-cyan) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          opacity: 0.02,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.8) 100%)',
        }}
      />

      {/* Floating shapes */}
      {[
        { top: '10%', left: '5%', size: 20, color: 'var(--brutal-yellow)', delay: '0s' },
        { top: '30%', right: '8%', size: 15, color: 'var(--brutal-cyan)', delay: '2s' },
        { top: '60%', left: '12%', size: 25, color: 'var(--brutal-magenta)', delay: '4s' },
        { top: '80%', right: '15%', size: 18, color: 'var(--brutal-green)', delay: '1s' },
        { top: '45%', left: '85%', size: 12, color: 'var(--brutal-lime)', delay: '3s' },
        { top: '15%', left: '70%', size: 22, color: 'var(--brutal-orange)', delay: '5s' },
        { top: '70%', left: '40%', size: 16, color: 'var(--brutal-gold)', delay: '6s' },
        { top: '50%', left: '25%', size: 14, color: 'var(--brutal-red)', delay: '7s' },
      ].map((shape, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: shape.top,
            left: shape.left,
            right: shape.right,
            width: shape.size,
            height: shape.size,
            backgroundColor: shape.color,
            opacity: 0.15,
            animationDelay: shape.delay,
          }}
          animate={{
            y: [0, -20, 0, 20, 0],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 20 + i * 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
