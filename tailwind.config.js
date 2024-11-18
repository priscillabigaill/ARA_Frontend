/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '860px': '860px',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        cream: {
          DEFAULT: '#fef9f2',
        },
        pink: {
          DEFAULT: '#ffe3e3',
          100: '#ffeaea',
        },
        blue: {
          DEFAULT: '#6b8daa',
          100: '#234561',
        },
        green: {
          DEFAULT: '#C9E9D2',
        },
      },
    },
  },
  plugins: [],
}

