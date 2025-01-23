import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist/client',
    ssrManifest: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  ssr: {
    noExternal: ['react-helmet-async']
  },
  optimizeDeps: {
    include: ['react-helmet-async'],
    exclude: ['lucide-react'],
  },
});
