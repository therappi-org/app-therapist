/** @type {import('tailwindcss').Config} */
import colors from './src/theme/colors';

module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
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
