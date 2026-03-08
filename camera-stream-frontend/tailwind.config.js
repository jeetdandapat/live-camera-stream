/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors:{
        background:"#020617",
        card:"#0f172a",
        primary:"#22c55e",
        muted:"#1e293b",
        destructive:"#ef4444"
      }
    },
  },
  plugins: [],
}