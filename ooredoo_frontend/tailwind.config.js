/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito Sans', 'Arial', 'sans-serif']
      },
      width: {
        '112': '28rem',
        '128': '32rem',
      },
      colors: {
        'ooredoo-primary': '#ED1C24'
      },
      tableLayout: ['responsive', 'hover', 'focus'],
    },
    variants: {
      tableLayout: ['responsive', 'hover', 'focus'],
    }
  },
  plugins: [],
}