import TopNav from "./TopNav";
import { VStack, Text, Button, Flex, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

const LoginRequired = (props: {}) => {
    const router = useRouter();
    const toast = useToast();
    toast.closeAll();
    return <>
        <TopNav />
        <VStack paddingTop="90px" h="100vh" justifyContent="center">
            <Text color="black">You must be logged in to perform this action</Text>
            <Button color="white" bg="main" onClick={(e) => router.back()} _hover={{bg: "mainLight"}}>Go back</Button>
        </VStack>
    </>
}
export default LoginRequired;