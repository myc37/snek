/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "space-mission": "SpaceMission",
      },
      keyframes: {
        "up-down": {
          "0%, 100%": { transform: "translateY(0%)" },
          "50%": { transform: "translateY(calc(-100% + 48px))" },
        },
        float: {
          "0%, 100%": { transform: "translateY(12px)" },
          "50%": { transform: "translateY(0)" },
        },
        grow: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        grow: "grow 3s ease-in infinite",
        "up-down": "up-down 3s linear infinite",
        float: "float 4s ease-in-out infinite",
        "float-slow": "float 6s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(#C2002F, #1F0007, #000)",
      },
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
        background: "#FFF6F8",
        text: "#262626",
        "gray-1": "#F8F9FA",
        "gray-2": "#F1F3F5",
        apprentice: "#6F5437",
        novice: "#697571",
        adept: "#e9c53b",
        master: "#78d3ec",
      },
    },
  },
  plugins: [],
};
