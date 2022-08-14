/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        116: '29rem'
      },
      spacing: {
        full: '100%'
      }
    },
  },
  plugins: [],
}
