import { Heading, Text, Flex, Image, Stack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { storage } from "../firebase";
import { Group } from "../firestoreTypes";
import { getGroupAvatarURL } from "../storageHelpers";
import { useRouter } from "next/router";

interface Props {
  group: Group;
  id: string;
}

const GroupCard = ({ group, id }: Props) => {
  const router = useRouter();
  return (
    <Stack
      direction="column"
      borderBottom="8px solid"
      borderColor="main"
      textAlign="left"
      verticalAlign="center"
      borderRadius="4px"
      boxShadow="0 4px 8px 0 rgba(0,0,0,0.2);"
      w="100%"
      maxW="400px"
      py="20px"
      px="20px"
      transitionProperty="transform"
      transitionDuration="0.5s"
      _hover={{ cursor: "pointer", transform: "scale(1.01)" }}
      onClick={() => {
        router.push("./group/" + id);
      }}
    >
      <Flex
        flexDir="column"
        my="10px"
        borderBottom="1px solid grey"
        h="100%"
        justifyContent="flex-end"
      >
        <Image src={getGroupAvatarURL(id)} maxH="200px" w="auto" />
        <Text>{group.description}</Text>
        <Heading>{group.name}</Heading>
      </Flex>
      <Flex flexDir="row" justifyContent="space-around" justifySelf="flex-end">
        <Text>
          {group.ageRange.toString()}
          {group.category.toString()}
        </Text>
      </Flex>
    </Stack>
  );
};

export default GroupCard;
