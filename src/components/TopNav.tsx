import {
    Button,
    Flex,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Spacer,
    MenuDivider,
    MenuGroup,
    Icon,
    LinkBox,
    LinkOverlay,
} from "@chakra-ui/react";
import { AddIcon, SettingsIcon, SearchIcon } from "@chakra-ui/icons";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "../media/GlinkLogo";
import { FiUser } from "react-icons/fi";
import firebase from "../firebase";

import styles from "./componentStyles.module.css";

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
        >
            <LinkBox>
                <LinkOverlay href="/">
                    <Logo />
                </LinkOverlay>
            </LinkBox>
            {user ? ( // If user is logged in (defined) then display the fragement before :
                <>
                    <Menu colorScheme="blue">
                        <MenuButton className={headerStyle} as="a" href="#">
                            Groups
                        </MenuButton>
                        <MenuList textColor="black">
                            <MenuItem icon={<SearchIcon />}>
                                <Link href="/search">Search for a Group</Link>
                            </MenuItem>
                            <MenuDivider />
                            <Link href="/group/create">
                                <MenuItem icon={<AddIcon />}>
                                    <a>Create Group</a>
                                </MenuItem>
                            </Link>
                            <Link href="/group/manage">
                                <MenuItem icon={<SettingsIcon />}>
                                    Manage Groups
                                </MenuItem>
                            </Link>
                        </MenuList>
                    </Menu>
                    <Link href="/network">
                        <a className={headerStyle}>Network</a>
                    </Link>
                    <Link href="/collaborate">
                        <a className={headerStyle}>Collaborate</a>
                    </Link>
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
