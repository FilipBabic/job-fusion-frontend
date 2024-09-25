/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#32a3d3",
        },
        secondary: {
          500: "#2a9d8f",
        },
        tertiary: {
          500: "#264653",
        },
      },
    },
  },
  plugins: [],
};
