/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-dark': '#2D283E',
        'card-dark': '#564F6F',
        'border-dark': '#4C495D',
        'text-light': '#D1D7E0',
        'accent-purple': '#802BB1',
      },
    },
  },
  plugins: [],
};