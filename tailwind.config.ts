import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#0B1437",
          800: "#16234B",
          700: "#1F2D63",
          600: "#324270",
          500: "#4A5783",
          400: "#6C7BA3",
          300: "#94A2C6",
        },
        midnight: {
          50: "#EEF2FB",
          100: "#DCE4F4",
          200: "#BBC8E8",
          300: "#8FA3D3",
          400: "#6079B7",
          500: "#3D5293",
          600: "#2C3E78",
          700: "#1F2E62",
          800: "#16234B",
          900: "#0B1437",
        },
        periwinkle: {
          50: "#F2F4FF",
          100: "#E2E7FF",
          200: "#C8D1FF",
          300: "#ABC4FF",
          400: "#8CA6F0",
          500: "#7088E0",
        },
        azure: {
          50: "#F2F7FD",
          100: "#E1EEF9",
          200: "#C7DEF1",
          300: "#9DC3E5",
          400: "#6FA4D4",
          500: "#4A85C1",
        },
        canvas: "#F4F6FB",
        cream: "#E8EEF8",
        warm: "#D9E2F2",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        urdu: ["var(--font-urdu)", "serif"],
      },
      boxShadow: {
        soft: "0 12px 40px -16px rgba(11, 20, 55, 0.22)",
        ring: "0 0 0 6px rgba(61, 82, 147, 0.18)",
        glow: "0 18px 60px -20px rgba(61, 82, 147, 0.45)",
      },
      backgroundImage: {
        "midnight-gradient":
          "linear-gradient(135deg, #0B1437 0%, #1F2D63 55%, #2C3E78 100%)",
        "periwinkle-gradient":
          "linear-gradient(135deg, #ABC4FF 0%, #C8D1FF 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out both",
        "slide-up": "slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both",
        float: "float 7s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
