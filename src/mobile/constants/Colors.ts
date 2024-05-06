import colors from '../../shared/theme/defaults.json';

const tintColorLight = colors.compliment;
const tintColorDark = '#fff';
console.log({ colors });
const themeColors = {
  ...colors,
  light: {
    text: '#000',
    background: colors.backgroundDark,
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: colors.backgroundDark,
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
export default themeColors;
