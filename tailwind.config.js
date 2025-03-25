const screens = {};
for (let i = 2000; i >= 320; i--) {
  screens[`-${i}`] = { max: `${i}px` };
}

const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "blue-gradient":
          "linear-gradient(180deg, rgba(3, 21, 51, 0) 0%, rgba(5, 24, 56, 0.9) 100%)",
      },
      fontFamily: {
        sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
        minion: "\"Minion 3\""
      },
      gridAutoRows: {
        "2fr": "minmax(0, 2fr)",
      },
      lineHeight: {
        130: "130%",
      }
    },
    screens: {
      "2xl": { max: "1536px" },
      xl: { max: "1280px" },
      lg: { max: "1024px" },
      md: { max: "768px" },
      sm: { max: "640px" },
      xs: { max: "475px" },
      "2xs": { max: "375px" },
      ...screens,
    },
  },
  colors: {
    black: "#000000",
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
