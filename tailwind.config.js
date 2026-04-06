/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        ink: "#4A4A4A",
        coolgray: "#CBCBCB",
        ivory: "#FFFFE3",
        slate: "#6D8196"
      }

    },
  },
  plugins: [],
}