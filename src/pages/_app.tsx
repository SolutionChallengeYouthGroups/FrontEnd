import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import { IconContext } from "react-icons";
import firebase from "../firebase";

function MyApp({ Component, pageProps }: AppProps) {
  // by writing firebase here, making sure firebase is initialized, react ignores unused imports
  firebase;
  return (
    <ChakraProvider resetCSS theme={theme}>
      <IconContext.Provider value={{}}>
        <Component {...pageProps} />
      </IconContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
