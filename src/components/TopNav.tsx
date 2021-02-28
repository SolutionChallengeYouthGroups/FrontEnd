import { Text, Button, Flex, Menu, MenuButton, MenuList, MenuItem, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useContext } from "react"
import { UserContext } from "../lib/context"
import firebase from "../firebase"; 

interface Props {}

const TopNav = (props: Props) => {
  const { user, username, email } = useContext(UserContext);

  const logout = () => {
    firebase.auth().signOut();
  }
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
    >
      {user ? // If user is logged in (defined) then display the fragement before :
        <>
          <Text>Save the Scouts</Text>
          <Spacer />
          <Link href="/userSettings">
            <Button>Settings</Button>
          </Link>
          <Menu>
            <MenuButton> profile image </MenuButton>
            <MenuList>
              <Text alignContent="center" >{username}</Text>
              <Text alignContent="center" >{email}</Text>
              <MenuItem>Settings</MenuItem>
              <MenuItem onClick={logout}>
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        </>
        : // Else display the fragment below (Sign Up and Login)
        <>
          <Text>Save the Scouts</Text>
          <Spacer />
          <Link href="/login">
            <Button>Login</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign Up</Button>
          </Link>
        </>
      }
      
    </Flex>
  );
};

export default TopNav;
