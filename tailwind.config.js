/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0b3b2e',
        primaryAccent: '#0f573f',
        sand: '#f4f1e6',
        ink: '#0a0f0c',
        sunshine: '#f9b233',
      },
      fontFamily: {
        display: ['"DM Sans"', 'Inter', 'ui-sans-serif', 'system-ui'],
        body: ['"Hind"', 'Noto Sans', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        card: '0 14px 38px rgba(11, 59, 46, 0.14)',
      },
    },
  },
  plugins: [],
}

