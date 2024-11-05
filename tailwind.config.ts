import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Poppins", "sans-serif"], // Define custom font
      },
      colors: {
        primary: {
          DEFAULT: "#FECFC5",
          dark: "#D9928A", // Primary color for dark theme
        },
        secondary: {
          DEFAULT: "#A5C9CA",
          dark: "#6B9B9C", // Secondary color for dark theme
        },
        tertiary: "#4A5568",

        background: {
          light: "#f2f2f2",
          dark: "#1a1a1a",
        },
        text: {
          light: "#000000",
          dark: "#ffffff",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'dark-md': '0 10px 15px -3px rgba(0, 0, 0, 0.9), 0 4px 6px -2px rgba(0, 0, 0, 0.4), 0 0 8px rgba(255, 255, 255, 0.6)',
        'dark-lg': '0 15px 25px -5px rgba(0, 0, 0, 0.9), 0 8px 10px -4px rgba(0, 0, 0, 0.4), 0 0 12px rgba(255, 255, 255, 0.8), 0 20px 30px -10px rgba(0, 0, 0, 0.8)',
      },
    },
  },
  plugins: [],
};

export default config;
