import { AppProps } from "next/app";

// UI stuff
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { IconContext } from "react-icons";

// Firebase + firestore
import { auth, firestore } from "../firebase";
import firebase from "../firebase";

// NextJS Context API
import { UserContext } from "../lib/context";

// Hooks
import useUserData from "../lib/hooks";


function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData();

  // by writing firebase here, making sure firebase is initialized, react ignores unused imports
  firebase;
  return (
    <ChakraProvider resetCSS theme={theme}>
      <IconContext.Provider value={{}}>
        <UserContext.Provider value={userData}>
          <Component {...pageProps} />
        </UserContext.Provider>
      </IconContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
