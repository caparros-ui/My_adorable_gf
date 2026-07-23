/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgBase: '#150a24',
        bgDeep: '#0d0617',
        purpleCustom: {
          DEFAULT: '#8b2fc9',
          deep: '#5b1f96',
          glow: 'rgba(139, 47, 201, 0.45)'
        },
        pinkCustom: {
          DEFAULT: '#ec4899',
          soft: '#f9a8d4',
          glow: 'rgba(236, 72, 153, 0.45)'
        },
        textLight: '#f5eefc',
        textMuted: '#c3aede'
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 14s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        }
      },
      backdropBlur: {
        xs: '4px',
        glass: '18px',
      }
    },
  },
  plugins: [],
}
