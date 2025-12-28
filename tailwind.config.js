/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class", "class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        en: ["var(--font-en)", "system-ui", "sans-serif"],
        ar: ["var(--font-ar)", "system-ui", "sans-serif"],
      },
      colors: {
        primaryGreen: "#3F6A54",
        primaryDarkGreen: "#325343",
        softGray: "#F5F7F5",
        warmCream: "#FFFCF6",
        softYellow: "#F6DF6B",
        softYellowLight: "#FAEEA3",
      },
    },
  },
  plugins: [typography, animate],
};
