import { extendTheme } from "@chakra-ui/react";

const fonts = {
  montserrat: "'Montserrat', sans-serif",
  roboto: "'Roboto', sans-serif",
  murecho: "'Murecho', sans-serif"
};

const colors = {
  container: "#fefefe",
  green: "#113e21",
  brown: "#b38b59",
  darkText: "#0c0c0f"
};

const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
}

const components = {
    Heading: {
        baseStyle: {
            fontFamily: 'montserrat',
            color: 'darkText'
        }
    },
    Text:{
        baseStyle: {
            fontFamily: 'roboto',
            fontWeight: '400',
            color:'darkText'
        }
    },
    Button:{
        baseStyle: {
            color: '#fff',
            size: 'md',
        }
    }
}

const theme = extendTheme({
  fonts,
  colors,
  breakpoints,
  styles:{
    global:{
        body:{
            bg: "#f0f0f0",
        }
    }
  },
  components
});

export default theme;