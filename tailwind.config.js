/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#00A9BB",
        secondaryColor: "#F4EAE3",
        subMenuColor:"#e6cdbf",
        headingColor: "#181A1E",
        textColor: "#4E545F",
        pinkColor: "#9C338D",
        whiteColor: "#FFFFFF"
      },

      boxShadow: {
        panelShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;",
      },
    },
  },
  plugins: [],
};