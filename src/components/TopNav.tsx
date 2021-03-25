import {
    Text,
    Button,
    Flex,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Spacer,
    Heading,
    MenuDivider,
    MenuGroup,
    Icon,
    LinkBox,
    LinkOverlay,
    Portal,
} from "@chakra-ui/react";
import { AddIcon, SettingsIcon, SearchIcon } from "@chakra-ui/icons"
import Link from "next/link";
import React from "react";
import Logo from "../media/GlinkLogo";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import { FiUser } from "react-icons/fi";
import firebase from "../firebase";

import styles from "./componentStyles.module.css"

interface Props {}

const TopNav = (props: Props) => {
    // const { user, username, email } = useContext(UserContext);
    const user = firebase.auth().currentUser;

    const logout = () => {
        firebase.auth().signOut();
    };
    const headerStyle = styles.underlineLinkHover + " " + styles.largeFont;
    // top navbar of the home page
    return (
        <Flex
            as="nav"
            align="center"
            justify="flex-start"
            flexDir="row"
            wrap="wrap"
            w="100%"
            top="0px"
            position="fixed"
            backgroundColor="main"
            paddingY="20px"
            paddingX="40px"
            color="pureWhite"
        >
            <LinkBox>
            <LinkOverlay href="/"><Logo /></LinkOverlay>
            </LinkBox>
            {user ? ( // If user is logged in (defined) then display the fragement before :
                <>
                    <Spacer/>
                    <Menu colorScheme="blue">
                        <MenuButton className={headerStyle}>
                            Groups
                        </MenuButton>
                        <MenuList textColor="black">
                            <MenuItem icon={<SearchIcon/>}>
                                <Link href="#">Search for a Group</Link>
                            </MenuItem>
                            <MenuDivider/>
                            <MenuItem icon={<AddIcon/>}>
                                <Link href="/group/create">Create Group</Link>
                            </MenuItem>
                            <MenuItem icon={<SettingsIcon/>}>
                                <Link href="#">Manage Groups</Link>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                    <Spacer/>
                    <a href="#" className={headerStyle}>Network</a>
                    <Spacer/>
                    <a href="#" className={headerStyle}>Collaborate</a>
                    <Spacer />
                    <Menu colorScheme="blue">
                        <MenuButton
                            transitionProperty="transform"
                            transitionDuration="0.5s"
                            _hover={{
                                cursor: "pointer",
                                transform: "scale(1.1)",
                            }}
                        >
                            <Icon as={FiUser} h="40px" w="auto" />
                        </MenuButton>
                        <MenuList textColor="black">
                            <MenuGroup title={user.displayName ?? ""} />
                            <MenuGroup title={user.email ?? ""} />
                            <MenuDivider />
                            <MenuItem>
                                <Link href="/userSettings">Settings</Link>
                            </MenuItem>
                            <MenuItem onClick={logout}>Log out</MenuItem>
                        </MenuList>
                    </Menu>
                </>
            ) : (
                // Else display the fragment below (Sign Up and Login)
                <>
                    <Spacer />
                    <Link href="/login">
                        <Button colorScheme="whiteAlpha">Login</Button>
                    </Link>
                    <Link href="/signup">
                        <Button marginLeft="30px" colorScheme="whiteAlpha">
                            Sign Up
                        </Button>
                    </Link>
                </>
            )}
        </Flex>
    );
};

export default TopNav;
