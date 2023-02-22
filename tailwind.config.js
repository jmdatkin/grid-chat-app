/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'mono': ['monospace']
    },
    extend: {
      screens: {
        'desktop': '1600px'
      }
    },
  },
  plugins: [],
}
