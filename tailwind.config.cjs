/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#C2002F",
        "primary-light": "#EE022A",
        secondary: "#231F20",
        background: "#FFFFFF",
        text: "#262626",
        "gray-1": "#F8F9FA",
        "gray-2": "#F1F3F5",
      },
    },
  },
  plugins: [],
};
