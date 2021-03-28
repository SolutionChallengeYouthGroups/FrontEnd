// UI + Components
import {
    Flex,
    LinkBox,
    LinkOverlay,
} from "@chakra-ui/react";
import Logo from "../media/GlinkLogo";
import TopNavContents from "./TopNavContents"

import firebase from "../firebase";
import { useEffect, useState } from "react";

interface Props {}

const TopNav = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(() => {
        const usr = firebase.auth().currentUser;
        return usr;
    })

    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
        firebase.auth().onAuthStateChanged(user => {
            setUser(user);
            setLoading(false);
        })
    }, [])

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
            position="fixed"
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
