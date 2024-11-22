/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      animation: {
        grow: "grow 2s ease-in-out forwards",
      },
      keyframes: {
        grow: {
          "0%": { height: "0" },
          "100%": { height: "100%" },
        },
      },
      fontFamily: {
        sans: ["Instrument Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
