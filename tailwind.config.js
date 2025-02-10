/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite/plugin";

export default {
  content: ["./src/**/*.{jsx,tsx,ts,html}", "./node_modules/flowbite/**/*.js"],

  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [flowbite],
};
