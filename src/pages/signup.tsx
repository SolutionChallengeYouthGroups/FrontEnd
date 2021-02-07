import {
  Flex,
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { FaGoogle, FaUserSecret } from "react-icons/fa";

interface Props {}

const signUpWithGoogle = () =>{
  firebase.auth()
}

const signup = (props: Props) => {
  // page to singup
  return (
    <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">
      <VStack w="100%" maxW="300px">
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input type="text" />
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="text" />
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
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
        <Button w="100%">Sign Up</Button>
        <Button
          w="100%"
          leftIcon={<Icon as={FaGoogle} />}
          variant="solid"
          colorScheme="blue"
        >
          Sign Up with Google
        </Button>
      </VStack>
    </Flex>
  );
};

export default signup;
