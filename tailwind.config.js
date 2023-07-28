/** @type {import('tailwindcss').Config} */
const colors = require('./src/theme/colors');

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors,
      fontFamily: {
        MontserratLight: ['Montserrat_300Light'],
        MontserratRegular: ['Montserrat_400Regular'],
        MontserratMedium: ['Montserrat_500Medium'],
        MontserratSemiBold: ['Montserrat_600SemiBold'],
        MontserratBold: ['Montserrat_700Bold'],
      },
    },
  },
  plugins: [],
};
