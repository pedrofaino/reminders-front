/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'whitesmoke',
        secondary: '#BCDFDF',
        4: '#879EA9',
        5:'#6F738A',
        6:'#182847',
        7:'#727A84'
    },
  },
  plugins: [],
}
}
