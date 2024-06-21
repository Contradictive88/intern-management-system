import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        main: {
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        primary: {
          DEFAULT: '#7c3aed',
          hover: '#6d28d9',
        },
        danger: {
          DEFAULT: '#dc2626',
          hover: '#b91c1c',
        },
        success: {
          DEFAULT: '#16a34a',
          hover: '#15803d',
        },
        warning: {
          DEFAULT: '#f59e0b',
          hover: '#d97706',
        },
        info: {
          DEFAULT: '#3b82f6',
          hover: '#2563eb',
        },
        light: {
          DEFAULT: '#f3f4f6',
          hover: '#e5e7eb',
        },
        dark: {
          DEFAULT: '#111827',
          hover: '#1f2937',
        },
      },
    },
  },
  plugins: [],
};
export default config;
