/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',
        secondary: '#E9FAE3',
        accent: '#DEE8D5',
        timber:'#D5C7BC',
        rose:'#AC92A6'
    },
  },
  plugins: [],
}
}
