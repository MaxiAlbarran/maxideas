import { extendTheme } from "@chakra-ui/react";

const fonts = {
  poppins: "'Poppins', sans-serif",
  montserrat: "'Montserrat', sans-serif",
};

const colors = {
  principal: "hsl(207, 26%, 17%)",
  pepe: "#EDF2F7",
  secondary: "#F0EBEB",
  lightText: "#1313A",
};

const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
}

const theme = extendTheme({
  fonts,
  colors,
  breakpoints,
  styles:{
    global:{
        body:{
            bg: "red"
        }
    }
  }
});

export default theme;