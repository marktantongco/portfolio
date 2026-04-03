import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  base: '/portfolio/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Three.js: always lazy-loaded, keep separate
          if (id.includes('three')) return 'hero';
          // Framer Motion: shared by many components
          if (id.includes('framer-motion')) return 'framer-motion';
          // React + ReactDOM: framework core
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) return 'vendor';
          // Prism: code highlighting — only in CodeShowcase
          if (id.includes('prism-react-renderer')) return 'prism';
          // Sonner: toast notifications — only in Contact
          if (id.includes('sonner')) return 'sonner';
        },
      },
    },
    target: 'es2020',
    cssMinify: true,
    sourcemap: false,
    // Increase chunk size warning limit for Three.js
    chunkSizeWarningLimit: 600,
  },
})
