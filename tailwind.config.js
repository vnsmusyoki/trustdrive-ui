/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light Theme
        primary: {
          blue: '#2563EB',
          dark: '#1E40AF',
        },
        accent: {
          purple: '#7C3AED',
        },
        bg: {
          light: '#F9FAFB',
          card: '#FFFFFF',
        },
        text: {
          primary: '#111827',
          secondary: '#6B7280',
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
        },
        // Dark Theme
        dark: {
          bg: {
            primary: '#0B1220',
            card: '#111827',
            border: '#1F2937',
          },
          text: {
            primary: '#F9FAFB',
            secondary: '#9CA3AF',
          },
          status: {
            success: '#34D399',
            warning: '#FBBF24',
            danger: '#F87171',
          },
        },
      },
    },
  },
  plugins: [],
}
