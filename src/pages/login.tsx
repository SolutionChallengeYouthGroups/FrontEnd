import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaGoogle, FaUserSecret } from "react-icons/fa";

interface Props {}

const login = (props: Props) => {
  // page to login

  return (
    <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">
      <VStack w="100%" maxW="300px">
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input type="text" />
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" />
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
        <Button w="100%">Login</Button>
        <Button
          w="100%"
          leftIcon={<Icon as={FaGoogle} />}
          variant="solid"
          colorScheme="blue"
        >
          Login with Google
        </Button>
        <Button
          w="100%"
          leftIcon={<Icon as={FaUserSecret} />}
          variant="incognito"
        >
          Login Anonymously
        </Button>
      </VStack>
    </Flex>
  );
};

export default login;
