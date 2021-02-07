import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import { IconContext } from "react-icons";
import { initFirebase } from "../firebase";

function MyApp({ Component, pageProps }: AppProps) {
  // check if already initialized: If length of firebase.apps is more than 1 it wont be called
  initFirebase()
  return (
    <ChakraProvider resetCSS theme={theme}>
      <IconContext.Provider value={{}}>
        <Component {...pageProps} />
      </IconContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
