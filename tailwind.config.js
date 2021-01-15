module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'pk-third': '#F5DB13',
        'pk-primary': '#F2B807',
        'pk-second':  '#F28F16',
        'pk-danger': '#D93E30',
        'pk-white': '#F2F2F2',
        'pk-dark': '#212121',
        'pk-green': '#70A83B',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
