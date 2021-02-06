import { Text, HStack, Image } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React from "react";

interface Props {
  username:string;
}

const MemberCard = (props: Props) => {
  const router = useRouter();
  return (
    <HStack
      _hover={{ cursor: "pointer" }}
      onClick={() =>
        router.push({
          pathname: "/user/[username]",
          query: { username: props.username },
        })
      }
      p="5px"
      w="80%"
    >
      {/* The image source will be based off of the username */}
      <Image
        borderRadius="full"
        src="https://via.placeholder.com/100"
        maxW="30%"
      />
      <Text>{props.username}</Text>
    </HStack>
  );
};

export default MemberCard;
