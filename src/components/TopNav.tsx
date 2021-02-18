import { Text, Button, Flex, Menu, MenuButton, Spacer, Box } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useContext } from "react"
import { UserContext } from "../lib/context"

interface Props {}

const TopNav = (props: Props) => {
  const { user, username, email } = useContext(UserContext);
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
          <Button>Hello</Button>
          <Button>Hello 2</Button>
          <Spacer />
          <Link href="/userSettings">
            <Button>Settings</Button>
          </Link>
          <Box // Just to show that username works - should be replaced with a profile pic drop down menu
            bg="gray.200"
            p="10px"
            borderRadius="90px"
          >
            {username}
          </Box>
          <Box // Just to show that username works - should be replaced with a profile pic drop down menu
            bg="gray.200"
            p="10px"
            borderRadius="90px"
          >
            {email}
          </Box>
        </>
        : // Else display the fragment below (Sign Up and Login)
        <>
          <Text>Save the Scouts</Text>
          <Button>Hello</Button>
          <Button>Hello 2</Button>
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
