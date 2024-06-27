import { extendTheme } from "native-base";

export const THEME = extendTheme({
  colors: {
    brand: {
      100: '#C9FAE9',
      200: '#95F6DC',
      300: '#5DE4CC',
      400: '#35C9BB',
      500: '#03A6A5',
      600: '#02838E',
      700: '#016377',
      800: '#004860',
      900: '#00344F',
    },
    gray: {
      700: '#121214',
      600: '#202024',
      500: '#29292E',
      400: '#323238',
      300: '#7C7C8A',
      200: '#C4C4CC',
      100: '#E1E1E6'
    },

    blueGray: {
      100: '#F0F5F5'
    },
    white: '#FFFFFF'
  },
  fonts: {
    heading: 'Roboto_700Bold',
    body: 'Roboto_400Regular'
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20
  },
  sizes: {
    14: 56,
    33: 148
  }
})