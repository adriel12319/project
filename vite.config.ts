import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080
  },
  ssr: {
    target: 'node',
    format: 'esm',
    noExternal: ['react-helmet-async']
  },
  build: {
    assetsDir: 'assets',
    outDir: 'dist/client', // Especifica o diretório de saída para o cliente
    manifest: true, // Gera um manifest.json para mapear os assets
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          return `assets/[name][extname]`;
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },
  preview: {
    port: 8080
  }
})
