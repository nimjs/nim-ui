export const colorTokens = {
  brand: {
    black: '#200101',
    deep: '#640E02',
    red: '#941102',
    redStrong: '#B41902',
    amber: '#854508',
  },
  accent: {
    ember: '#C65B2C',
    flame: '#D97706',
    glow: '#F3E7DE',
  },
  neutral: {
    white: '#FFFFFF',
    50: '#FCFAFA',
    100: '#F7F1F0',
    200: '#E9DEDD',
    300: '#D4C1BF',
    400: '#AA8A86',
    500: '#7B5C59',
    600: '#573B38',
    700: '#3B211E',
    800: '#2A0C0B',
    900: '#200101',
  },
  semantic: {
    danger: '#B41902',
    warning: '#854508',
    success: '#1F6B57',
    info: '#640E02',
  },
} as const;

export type ColorTokens = typeof colorTokens;
