/** Palette: ultramarine (brand) + saffron (accent) on a cool paper background */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { 50: '#EEF1FE', 100: '#DDE3FC', 200: '#BCC8F9', 500: '#4A5FE0', 600: '#2F42CC', 700: '#2535A6', 800: '#1D2A82' },
        accent: { 100: '#FDEBC8', 400: '#F7B84B', 500: '#F5A524', 600: '#DB8B0A' },
        ink: { DEFAULT: '#101828', soft: '#344054', mute: '#667085' },
        paper: '#F6F7FB',
        line: '#E4E7EE',
        ok: '#168A55',
        bad: '#D13F3F',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
