/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'stanbic-blue': '#0033a1',
                'stanbic-blue-light': '#60a5fa',
                'stanbic-blue-deep': '#001a47',
            },
        },
    },
    plugins: [],
}
