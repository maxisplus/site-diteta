/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#667eea',
          dark: '#5568d3',
          light: '#818cf8',
        },
        secondary: {
          DEFAULT: '#764ba2',
          dark: '#5e3a82',
          light: '#9f6fd1',
        },
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.5s ease-out',
        'fadeIn': 'fadeIn 0.3s ease-out',
        'scaleIn': 'scaleIn 0.4s ease-out',
        'slideInRight': 'slideInRight 0.4s ease-out',
        'pulse-subtle': 'pulse 2s ease-in-out infinite',
      },
      boxShadow: {
        'modern': '0 10px 40px rgba(0, 0, 0, 0.1)',
        'modern-lg': '0 20px 60px rgba(0, 0, 0, 0.15)',
        'glow': '0 0 20px rgba(102, 126, 234, 0.5)',
      },
    },
  },
  plugins: [],
}
