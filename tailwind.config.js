/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "#9aa0a6",
        bg_dark: "#202125",
        bg_input: "#303134",
        bg_light: "#EBEBEB",
        hover_color: "#3D4043",
      },
    },

    plugins: [],
  },
};
