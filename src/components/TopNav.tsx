import { Text, Button, Flex, Menu, MenuButton, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface Props {}

const TopNav = (props: Props) => {
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
    </Flex>
  );
};

export default TopNav;
