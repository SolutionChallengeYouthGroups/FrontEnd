import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };

// Chakra -ui theme, shouldn't have to use too much
const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  styles: {
    global: {
      "html,body": {
        fontFamily: "Roboto",
        backgroundColor: "#f8f6f6",
      },
    },
  },
  colors: {
    black: "#16161D",
    white: "#f8f6f6",
    main: "#62BF8A",
    pureWhite: "#ffffff",
  },
  components: {
    Button: {
      variants: {
        incognito: {
          bg: "#767676",
          color: "white",
          _hover: { bg: "#505050" },
        },
      },
    },
  },
  fonts,
  breakpoints,
});

export default theme;
