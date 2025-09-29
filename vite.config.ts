// vite.config.ts (Atualizado)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // 👈 IMPORTANTE: Importe o módulo path

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ADICIONAR A RESOLUÇÃO DE ALIAS
  resolve: {
    alias: {
      // Define que qualquer coisa que comece com @/ aponta para a pasta src
      "@": path.resolve(__dirname, "./src"),
    },
  },
})