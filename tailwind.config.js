module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#3f13d8',
        primaryGradientStart: '#2b13d8',
        primaryGradientEnd: '#5313d8',
        primaryMono: '##260c83',
        primaryMonoDark: '#0d042e',
        tetradic1: '#d81349',
        compliment: '#ACD813',
        tetradic2: '#13d8a1',
        complimentSplit1: '#d81385',
        complimentSplit2: '#36d813',
        triad1: '#d83f13',
        triad2: '#13d83f',
        error: '#e3342f',
        gradient1: '#d700a6',
        gradient2: '#FF0070',
        gradient3: '#FF7147',
        gradient4: '#F9F871',
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
