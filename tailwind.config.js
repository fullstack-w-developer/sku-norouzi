/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                sku: "#096EA4",
            },
            backgroundColor: {
                sku: "#096EA4",
            },
            fontFamily: {
                ExtraBold: "ExtraBold",
                yekanBold: "yekanBold",
                artinBlack: "artin_black",
                artinBold: "artin_bold",
                artinLight: "artin_light",
            },
        },
    },
    plugins: [],
};
