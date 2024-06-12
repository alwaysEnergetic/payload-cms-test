/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'post-yellow': '#FFCC00',
        'dhl-red': '#D40511',
      },
    },
  },
  plugins: [],
}
