/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  safelist: [
    "dark",
    "dark:bg-slate-900",
    "dark:bg-slate-800",
    "dark:bg-slate-700",
    "dark:border-slate-700",
    "dark:border-slate-600",
    "dark:text-white",
    "dark:text-slate-300",
  ],

  theme: {
    extend: {},
  },

  plugins: [],
}