import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <motion.div
      className="fixed top-0 left-0 h-1 hidden"
      style={{
        width,
        background: 'linear-gradient(90deg, var(--brutal-yellow), var(--brutal-cyan), var(--brutal-green))',
        zIndex: 60,
      }}
      aria-hidden="true"
    />
  );
}
