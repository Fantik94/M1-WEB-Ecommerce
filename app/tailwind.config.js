// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'glow-blue': '#3b82f6',
        'glow-teal': '#2dd4bf',
        'glow-pink': '#ec4899',
      },
    },
  },
  plugins: [],
}
