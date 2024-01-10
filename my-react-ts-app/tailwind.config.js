/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#0C111B',
        'secondary-dark': '#1f2937',
        'primary-yellow': '#FFEE00',
        'secondary-yellow': '#FFDB58',
        'soft-blue': '#e9f4fd'
      }
    }
  },
  plugins: ['']
}
