import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import { IconContext } from "react-icons";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <IconContext.Provider value={{}}>
        <Component {...pageProps} />
      </IconContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
