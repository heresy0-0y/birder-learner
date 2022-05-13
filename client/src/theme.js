import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const Button = {
  baseStyle: {
    bg: "hsla(210, 38%, 95%, 0.1)",
  },
};

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  xs: "24em",
  sm: "43em",
  md: "50em",
  lg: "62em",
  xl: "80em",
  "2xl": "115em",
});

const theme = extendTheme({
  components: {
    Button,
  },
  colors: {
    black: "#16161D",
  },
  fonts,
  breakpoints,
  icons: {
    logo: {
      path: (
        <svg
          width="3000"
          height="3163"
          viewBox="0 0 3000 3163"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="3000" height="3162.95" fill="none" />
          <path
            d="M1470.89 1448.81L2170 2488.19H820V706.392H2170L1470.89 1448.81ZM1408.21 1515.37L909.196 2045.3V2393.46H1998.84L1408.21 1515.37Z"
            fill="currentColor"
          />
        </svg>
      ),
      viewBox: "0 0 3000 3163",
    },
  },
});

export default theme;
