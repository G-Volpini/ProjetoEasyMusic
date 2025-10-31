/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./src/**/*.html", "./src/**/*.ts"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7F10FF',
          light: '#7700FF',
          dark: '#6812CC',
        },
        secondary: {
          DEFAULT: '#0057FF',
          light: '#0054B6',
        },
        purple: {
          pro: '#9335FF',
        },
        dark: {
          DEFAULT: '#191919',
          light: '#292929',
        },
        gray: {
          DEFAULT: '#707070',
          light: '#959595',
          lighter: '#AFAFAF',
          lightest: '#D5D5D5',
          bg: '#F0F0F0',
        },
        blue: {
          light: '#E0EAFF',
          bg: '#F5F8FF',
        },
      },
      fontFamily: {
        sans: ['Arial', '-apple-system', 'Roboto', 'Helvetica', 'sans-serif'],
        'source-sans': ['Source Sans Pro', '-apple-system', 'Roboto', 'Helvetica', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(90deg, #6812CC 0%, #6515C0 25%, #7F10FF 50%)',
        'gradient-hero': 'linear-gradient(186deg, #F5F8FF 1.75%, #FFF 98.15%)',
        'gradient-fade': 'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.64) 60%, #FFF 100%)',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
