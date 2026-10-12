import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#090d16',
        surface: {
          50: '#1e293b',
          100: '#161f30',
          200: '#111827',
          300: '#0f172a',
          400: '#0b1120',
          500: '#070b14',
        },
        electric: {
          blue: '#3b82f6',
          indigo: '#6366f1',
          purple: '#a855f7',
          cyan: '#06b6d4',
          emerald: '#10b981',
        },
      },
      boxShadow: {
        'glow-blue': '0 0 25px -5px rgba(59, 130, 246, 0.35)',
        'glow-purple': '0 0 25px -5px rgba(168, 85, 247, 0.35)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.35)',
        'card-dark': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
