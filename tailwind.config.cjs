/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#C2002F",
          50: "#FFD6E0",
          100: "#FFB8C9",
          200: "#FF7B9B",
          300: "#FF3D6C",
          400: "#FF003E",
          500: "#C2002F",
          600: "#990025",
          700: "#70001B",
          800: "#480011",
          900: "#1F0007",
        },
        "primary-light": "#EE022A",
        secondary: "#231F20",
        background: "#FAFAFA",
        text: "#262626",
        "gray-1": "#F8F9FA",
        "gray-2": "#F1F3F5",
      },
    },
  },
  plugins: [],
};
