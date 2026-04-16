/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6C3AED',
        'primary-dark': '#5a2fd4',
        'primary-light': '#EDE9FD',
        success: '#10B981',
        'success-light': '#D1FAE5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

