/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,vue,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'openai-bg': '#212121',
        'openai-title': '#B4B4B4',
        'openai-input': '#2F2F2F',
        'openai-text': '#9B9B9B',
      }
    },
  },
  plugins: [],
}