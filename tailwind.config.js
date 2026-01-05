/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
      },
      colors: {
        primary: {
          DEFAULT: "#2563eb", // medical blue
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#ecfeff", // soft medical background
          foreground: "#0f172a",
        },
      },
    },
  },
  plugins: [],
};
