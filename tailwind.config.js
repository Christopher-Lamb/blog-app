/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./src/pages/**/*.{js,jsx,ts,tsx}`, `./src/components/**/*.{js,jsx,ts,tsx}`],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        primary: "#2e2050",
        "dark-primary": "#070510",
        secondary: "#c49cd6",
        // "secondary-lighter": "#7da0ca",
        accent: "#674a86",
        "white-text": "rgba(255, 255, 255, 0.9)",
      },
      spacing: {
        five: "1215.9808px",
        four: " 751.5296px",
        three: "464.48px",
        two: "287.0704px",
        one: "177.4192px",
        large: "109.6592px",
        med: "67.7696px",
        small: "41.8896px",
        xsmall: "25.88px",
        "2xsmall": "16px",
        "3xsmall": "9.8896px",
      },
      fontSize: {
        two: ["6.8537rem", "1"],
        one: ["4.2356rem", "1"],
        large: ["2.6181rem", "2.8799rem"],
        medlarge: ["2.1175rem", "2.4752rem"],
        med: ["1.6175rem", "2.0704rem"],
        small18: ["1.125rem", "1.5rem"],
        small: ["1rem", "1.5rem"],
        xsmall: ["0.6181rem", "0.883rem"],
      },
    },
  },
  plugins: [],
};
