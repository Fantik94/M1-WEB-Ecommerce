// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Ajoute la gestion du thème sombre
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'glow-blue': '#3b82f6',
        'glow-teal': '#2dd4bf',
        'glow-pink': '#ec4899',
        primary: {
          "50":"#eef2ff",
          "100":"#e0e7ff",
          "200":"#c7d2fe",
          "300":"#a5b4fc",
          "400":"#818cf8",
          "500":"#6366f1",
          "600":"#4f46e5",
          "700":"#4338ca",
          "800":"#3730a3",
          "900":"#312e81",
          "950":"#1e1b4b"
        }
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
