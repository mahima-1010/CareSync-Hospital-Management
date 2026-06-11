/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#0f172a',      // Slate 900
        cardBg: '#1e293b',      // Slate 800
        cyanGlow: '#06b6d4',    // Tailwind Cyan 500
        cyanHover: '#0891b2',   // Tailwind Cyan 600
        accentBlue: '#3b82f6',  // Blue 500
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
