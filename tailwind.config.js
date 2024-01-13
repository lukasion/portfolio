/** @type {import('tailwindcss').Config} */
export default {
    theme: {},
    plugins: [require("daisyui")],
    content: [
        `./components/**/*.{vue,js,ts}`,
        `./layouts/**/*.vue`,
        `./pages/**/*.vue`,
        `./assets/scss/**/*.scss`,
        `./composables/**/*.{js,ts}`,
        `./plugins/**/*.{js,ts}`,
        `./utils/**/*.{js,ts}`,
        `./App.{js,ts,vue}`,
        `./app.{js,ts,vue}`,
        `./Error.{js,ts,vue}`,
        `./error.{js,ts,vue}`,
        `./app.config.{js,ts}`
    ],
    container: {
        padding: {
            DEFAULT: '1rem',
            sm: '2rem',
            lg: '4rem',
            xl: '5rem',
            '2xl': '7rem',
        },
        width: {
            DEFAULT: '100%',
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1024px',
        }
    }
};