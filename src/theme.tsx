import { extendTheme } from "@chakra-ui/react";

const fonts = {
  anybody: "'Anybody', sans-serif",
  roboto: "'Roboto', sans-serif",
};

const colors = {
  lightBgColor: "#F2F2F2",  
  lightTextColor: "#F5F5FA",
  darkTextColor: "#1A1313"
//   blue: #457cf6 || #a5bff8
//   orange: #FFAB2F || #fab16d
//   gray: #c1c1c1 || #999
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
            fontFamily: 'anybody'
        }
    },
    Text:{
        baseStyle: {
            fontFamily: 'roboto',
            fontWeight: '500'
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
            bg: "#333",
        }
    }
  },
  components
});

export default theme;