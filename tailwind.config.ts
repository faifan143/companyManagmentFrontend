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
      backgroundImage: {
        "droppable-fade": "linear-gradient(#252628,#2e2e30)",
        "radial-light":
          "radial-gradient(circle, rgba(62, 62, 64) 0%, rgb(46, 46, 48) 100%)",
      },
      colors: {
        main: "#2e2e30",
        secondary: "#454547",
        dark: "#252628",
        titles: "#ffffff",
        labels: "#cbd5e1",

        "main-light": "#fafafa",
        "secondary-light": "#ffffff",
        "accent-light": "#f4f4f6",
        "text-primary-light": "#3d3d3d",
        "text-secondary-light": "#6c757d",
        "border-light": "#e3e3e3",
        "button-light": "#2684ff",
        "button-text-light": "#ffffff",
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
