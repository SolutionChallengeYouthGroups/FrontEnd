// UI
import {
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Spacer,
    MenuDivider,
    MenuGroup,
    Icon,
} from "@chakra-ui/react";
import { AddIcon, SettingsIcon, SearchIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { FiUser, FiMap } from "react-icons/fi";
import styles from "./componentStyles.module.css";

// Firebase + Next
import firebase from "../firebase";
import { useRouter } from "next/router";

interface Props {
    user: firebase.User | null;
}

const TopNavContents = (props: Props) => {
    // Logs out the user when this function is called
    const logout = () => {
        firebase.auth().signOut();
    };

    const router = useRouter();
    let path = router.asPath;
    if (path.startsWith("/login") || path.startsWith("/signup")) {
        path = "";
    } else {
        path = "?next=" + path;
    }
    // Nice animation for header
    const headerStyle = styles.underlineLinkHover + " " + styles.largeFont;
    const user = props.user;
    return (
        <>
            {user ? ( // If user is logged in (defined) then display the fragement before :
                <>
                    <Menu colorScheme="blue">
                        <MenuButton className={headerStyle} as="a" href="#">
                            Groups
                        </MenuButton>
                        <MenuList textColor="black">
                            <Link href="/">
                                <MenuItem icon={<SearchIcon />}>
                                    <a>Search for Groups</a>
                                </MenuItem>
                            </Link>
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
                            <Link href="/map">
                                <MenuItem icon={<Icon as={FiMap} />}>
                                    Map
                                </MenuItem>
                            </Link>
                        </MenuList>
                    </Menu>
                    <Link href="/network">
                        <a className={headerStyle}>Network</a>
                    </Link>
                    <Link href="/">
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
                            <Icon as={FiUser} h="35px" w="auto" />
                        </MenuButton>
                        <MenuList textColor="black">
                            <MenuGroup title={user.displayName ?? ""} />
                            <MenuGroup title={user.email ?? ""} />
                            <MenuDivider />
                            <Link href="/userSettings">
                                <MenuItem>Settings</MenuItem>
                            </Link>
                            <MenuItem onClick={logout}>Log out</MenuItem>
                        </MenuList>
                    </Menu>
                </>
            ) : (
                // Else display the fragment below (Sign Up and Login)
                <>
                    <Spacer />
                    <Link href={"/login" + path}>
                        <Button colorScheme="whiteAlpha">Login</Button>
                    </Link>
                    <Link href={"/signup" + path}>
                        <Button marginLeft="30px" colorScheme="whiteAlpha">
                            Sign Up
                        </Button>
                    </Link>
                </>
            )}
        </>
    );
};

export default TopNavContents;
