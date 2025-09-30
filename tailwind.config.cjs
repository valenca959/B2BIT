/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Poppins"', 'sans-serif'],
      },
      colors: {
        'b2bit-primary': '#02274f',
        'b2bit-secondary': '#f9c30a',
        'b2bit-hover': '#0a3d62',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}