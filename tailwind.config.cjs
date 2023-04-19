/** @type {import('tailwindcss').Config} */
const neonGreen = '#a4ffaf'
const almostWhite = '#e6e5ea'
const gray = '#817d92'
const darkGray = '#24232c'
const veryDarkGray = '#18171f'
const yellow = '#f8cd65'
const orange = '#fb7c58'
const red = '#f64a4a'
const white = '#ffffff'

module.exports = {
  content: ['./index.html', './src/**/*.ts'],
  theme: {
    colors: {
      primary: {
        400: neonGreen,
      },
      neutral: {
        50: almostWhite,
        300: gray,
        500: darkGray,
        700: veryDarkGray,
      },
      danger: {
        400: red,
      },
      warning: {
        300: yellow,
        500: orange,
      },
      success: {
        400: neonGreen,
      },
      transparent: 'transparent',
      white,
    },
    extend: {},
  },
  plugins: [],
}
