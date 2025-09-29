// tailwind.config.js (Conteúdo Final)
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'b2bit-primary': '#002446', // Azul Escuro do logo e botão
        'b2bit-secondary': '#FFC700', // Amarelo/Dourado do 'it'
        'input-background': '#F5F5F5', // Fundo dos campos
      },
      borderRadius: {
          // Define um arredondamento maior para Cards/Inputs (opcionalmente)
          'xl': '1rem', 
      },
    },
  },
  plugins: [],
}