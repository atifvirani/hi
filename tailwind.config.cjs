/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebar: "#0f172a",
        active: "#3b82f6",
        bg: "#f8fafc",
      }
    },
  },
  plugins: [],
}