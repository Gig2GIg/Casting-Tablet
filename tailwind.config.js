const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: colors.purple,
        purple: '#4D2545',
        gray: {
          100: '#fafafa',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
      },
      spacing: {
        72: '18rem',
        84: '21rem',
        96: '24rem',
      },
    },
  },
  variants: {},
  plugins: [],
};
