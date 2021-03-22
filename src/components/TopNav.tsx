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
  Image,
  MenuDivider,
  MenuGroup,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import { FiUser } from "react-icons/fi";
import firebase from "../firebase";

interface Props {}

const TopNav = (props: Props) => {
  // const { user, username, email } = useContext(UserContext);
  const user = firebase.auth().currentUser;

  const logout = () => {
    firebase.auth().signOut();
  };
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
      <Heading borderBottom="solid 1px white" marginBottom="2px">
        Save the Scouts
      </Heading>
      {user ? ( // If user is logged in (defined) then display the fragement before :
        <>
          <Spacer />
          <Menu colorScheme="blue">
            <MenuButton
              transitionProperty="transform"
              transitionDuration="0.5s"
              _hover={{ cursor: "pointer", transform: "scale(1.1)" }}
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
