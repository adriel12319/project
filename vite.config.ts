import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  ssr: {
    target: 'node',
    format: 'esm',
    noExternal: ['react-helmet-async']
  },
  build: {
    rollupOptions: {
      output: {
        format: 'esm'
      }
    },
    assetsDir: 'assets'
  }
})
