import { Text, HStack, Image } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React from "react";
import { Ref } from "typesaurus";
import { User } from "../../firestoreTypes";

interface Props {
  userRef: Ref<User>;
}

const MemberCard = ({ userRef }: Props) => {
  const router = useRouter();
  return (
    <HStack
      _hover={{ cursor: "pointer" }}
      onClick={() =>
        router.push({
          pathname: "/user/[username]",
          query: { username: userRef.id },
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
      <Text>{userRef.id}</Text>
    </HStack>
  );
};

export default MemberCard;
