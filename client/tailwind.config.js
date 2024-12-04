/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        bebas: ["Bebas Neue", "sans-serif"],
      },
      colors: {
        primary: "var(--primary-color)",
        primaryHover: "var(--primaryHover-color)",
        secondary: "var(--secondary-color)",
        primaryTra: "var(--primaryTra-color)",
        whiteColor: "var(--white-color)",
        blackColor: "var(--black-color)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        xs: "475px",
        sm: "640px",
        md: "867px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};
