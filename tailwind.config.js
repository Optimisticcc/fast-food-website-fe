module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      scale: ['responsive', 'hover', 'group-hover'],
      display: ['responsive', 'hover', 'group-hover'],
      
      borderCollapse: ['hover', 'focus'],
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
