/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': "#6366f1",
        'primary-dark': "#4f46e5",
        'secondary': "#8b5cf6",
        'accent': "#06b6d4",
        'dark': "#0f172a",
        'dark-light': "#1e293b",
        'dark-lighter': "#334155",
        'text-primary': "#f8fafc",
        'text-secondary': "#cbd5e1",
        'text-muted': "#94a3b8",
        'success': "#10b981",
        'warning': "#f59e0b",
        'error': "#ef4444",
        'gradient-start': "#667eea",
        'gradient-end': "#764ba2"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'card-gradient': 'linear-gradient(145deg, #1e293b 0%, #334155 100%)',
        'button-gradient': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(200px, 1fr))'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}

