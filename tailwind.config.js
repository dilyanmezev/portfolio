export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        ink: '#0F172A',
        accent: '#2563EB',
        accent2: '#06B6D4'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' }
        }
      },
      animation: {
        float: 'float 2.5s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
