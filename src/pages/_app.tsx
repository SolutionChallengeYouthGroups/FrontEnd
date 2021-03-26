import { AppProps } from "next/app";

// UI stuff
import { ChakraProvider, useToast } from "@chakra-ui/react";
import theme from "../theme";
import { IconContext } from "react-icons";

// Firebase + firestore
import firebase from "../firebase";

// NextJS Context API
import { UserContext } from "../lib/context";

// Hooks
import useUserData from "../lib/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";


function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData();

  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    function closeToasts(url: any){
      toast.closeAll();
    }
    router.events.on("routeChangeStart", closeToasts); // close toasts on route change

    return () => {
      router.events.off('routeChangeError', closeToasts)
    }
  }, []);

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
