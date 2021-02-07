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
  colors: {
    black: "#16161D",
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
