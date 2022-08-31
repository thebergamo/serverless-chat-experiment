const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/*.{js,ts,jsx,tsx}",
    "./src/components/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /bg-(aeiou|bcdfg|hjklm|npqrs|tvxwyz)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.purple,
        secondary: colors.fuchsia,
        aeiou: "#7DD3FC",
        bcdfg: "#F9A8D4",
        hjklm: "#FDBA74",
        npqrs: "#F87171",
        tvxwyz: "#A3E635",
      },
    },
  },
  plugins: [],
};
