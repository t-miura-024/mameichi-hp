import defaultTheme from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: "#FAF6F1",
          100: "#F0E6D6",
          200: "#E0CCAD",
          300: "#C9A97A",
          400: "#B38B4D",
          500: "#8B6914",
          600: "#6F4E37",
          700: "#5A3E2B",
          800: "#452F20",
          900: "#312116",
        },
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [typography],
};
