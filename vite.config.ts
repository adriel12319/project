import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080
  },
  ssr: {
    target: 'node',
    noExternal: ['react-helmet-async']
  },
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return 'assets/[name][extname]';
          const info = assetInfo.name.split('.');
          return `assets/[name][extname]`;
        },
      }
    }
  }
})