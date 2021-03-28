// UI + Components
import { Flex, LinkBox, LinkOverlay } from "@chakra-ui/react";
import Logo from "../media/GlinkLogo";
import TopNavContents from "./TopNavContents";

// Firebase, React
import firebase from "../firebase";
import { useEffect, useState } from "react";

const TopNav = () => {
    // true: user still loading, false otherwise
    // This dictates whether TopNavContents should be returned or not
    const [loading, setLoading] = useState(true);
    // user is loaded so we can just get the currentUser.
    const [user, setUser] = useState(() => {
        const usr = firebase.auth().currentUser;
        return usr;
    });

    // hasMounted is a boolean which is only true when components have mounted
    const [hasMounted, setHasMounted] = useState(false);

    // Because useEffect is only called when components are mounted, when there is
    // a change we can setHasMounted to true.
    useEffect(() => {
        setHasMounted(true);
        // On AuthStateChanged only changes when user is either logged in or out not loading.
        firebase.auth().onAuthStateChanged((user) => {
            setUser(user); // Since we know user has been loaded we can call setUser
            setLoading(false); // this is called when we know user has "loaded"
        });
    }, []);

    // If our components have not mounted return nothing so the DOM fits React's expectations
    if (!hasMounted) {
        return null;
    }

    // top navbar of the home page
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            flexDir="row"
            wrap="wrap"
            w="100%"
            top="0px"
            position="sticky"
            backgroundColor="main"
            paddingY="6px"
            paddingX="40px"
            color="pureWhite"
            zIndex={2}
        >
            <LinkBox>
                <LinkOverlay href="/">
                    <Logo />
                </LinkOverlay>
            </LinkBox>
            {!loading && <TopNavContents user={user} />}
        </Flex>
    );
};

export default TopNav;
