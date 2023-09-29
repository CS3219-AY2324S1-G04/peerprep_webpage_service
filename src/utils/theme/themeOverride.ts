/* eslint-disable */
import { extendTheme } from '@mui/joy/styles';

declare module '@mui/joy/styles' {
  interface TypographySystemOverrides {
    logo: true;
  }
}

const indigo = {
  50: '#EEF4FF',
  100: '#E0EAFF',
  200: '#C7D7FE',
  300: '#A4BCFD',
  400: '#8098F9',
  500: '#6172F3',
  600: '#444CE7',
  700: '#3538CD',
  800: '#2D31A6',
  900: '#2D3282',
};

const theme = extendTheme({
  typography: {
    // See https://mui.com/joy-ui/customization/theme-typography/#adding-more-levels to find out how to apply custom logo level with Typography component
    logo: {
      fontFamily: 'Inconsolata, monospace',
      fontWeight: 700,
      fontSize: '24px',
    },
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: indigo[50],
          100: indigo[100],
          200: indigo[200],
          300: indigo[300],
          400: indigo[400],
          500: indigo[500],
          600: indigo[600],
          700: indigo[700],
          800: indigo[800],
          900: indigo[900],
        },
      },
    },
    dark: {
      palette: {
        primary: {
          50: indigo[50],
          100: indigo[100],
          200: indigo[200],
          300: indigo[300],
          400: indigo[400],
          500: indigo[500],
          600: indigo[600],
          700: indigo[700],
          800: indigo[800],
          900: indigo[900],
        },
      },
    },
  },
});

export default theme;
