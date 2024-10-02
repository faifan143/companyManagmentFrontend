/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: "var(--foreground)",
        background: "#1A1A2E", // Dark background similar to the board background
        card: "#2E2E4D", // Card background color
        textPrimary: "#EDEDED", // Primary text color (whiteish)
        textSecondary: "#A6A6C3", // Secondary text color (light grayish-blue)
        accent: "#0098FD", // Accent color similar to the blue buttons
        low: "#00D68F", // Green tag (Low priority)
        medium: "#FFAA00", // Yellow tag (Medium priority)
        high: "#FF3D71", // Red tag (High priority)
        inputBackground: "#2C2C3E", // Dark input background
        border: "#3E3E5C", // Border color, slightly lighter than the background
        shadow: "rgba(0, 0, 0, 0.25)", // Subtle shadow for elements
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: Function }) {
      const newUtilities = {
        ".desktop-grid": {
          display: "grid",
          gridTemplateColumns: "repeat(12, 92px)",
          gap: "16px",
          width: "fit-content",
          margin: "auto",
        },
        ".mobile-grid": {
          display: "grid",
          gridTemplateColumns: "repeat(4, 92px)",
          gap: "16px",
          width: "fit-content",
          margin: "auto",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
export default config;
