import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/love-language-game/',  // GitHub Pages base path
  server: {
    allowedHosts: true,
    cors: true
  }
})
