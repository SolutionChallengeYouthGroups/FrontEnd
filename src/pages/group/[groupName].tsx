import {
  VStack,
  Text,
  Box,
  Image,
  Flex,
  Center,
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import LinkWithIcon from "../../components/LinkWithIcon";
import MemberCard from "../../components/MemberCard";
import PostCard from "../../components/PostCard";
import { db } from "../../firebase";
import { Group as firestoreGroup } from "../../types";

interface Props {}

const Group = (props: Props) => {
  // page for any kind of youth club, with their name location, contact details, members etc...
  // can be customized by the owner of the youth club
  const router = useRouter();
  const { groupName } = router.query;
  const [group, setGroup] = useState<firestoreGroup | undefined>(undefined);
  useEffect(() => {
    // whenever id changes:
    if (typeof groupName == "string") {
      // make sure the url is of format group/[id], e.g. it isnt just group/
      db.collection("groups")
        .doc(groupName)
        .get()
        .then(async (result) => {
          let data = result.data();
          console.log(data?.members);
          setGroup({
            announcements: data?.announcements,
            chat: result.ref.collection("chat"),
            name: groupName,
            createdAt: data?.createdAt,
            description: data?.description,
            location: data?.location,
            owner: data?.owner,
            type: data?.type,
            members: data?.members,
          });
        });
    }
  }, [groupName]);
  if (!group) {
    // if group is undefined, just render a loading screen
    return <div>Loading</div>;
  }
  return (
    <Flex
      flexDir="column"
      justifyContent="start"
      alignItems="center"
      w="100%"
      minH="100vh"
    >
      <Flex
        wrap="wrap"
        w="100%"
        alignItems="center"
        borderBottom="1px"
        justifyContent="space-evenly"
        margin="20px"
        minH="100%"
      >
        {/* Top bar with basic information */}
        <Image
          src="https://via.placeholder.com/150"
          maxH="100%"
          maxW="100%"
          borderRadius="full"
          p="20px"
        />
        <Text fontSize="3em">{group.name}</Text>

        <VStack>
          <LinkWithIcon link="https://discord.com" />
        </VStack>
      </Flex>

      <HStack
        wrap="wrap-reverse"
        w="90%"
        margin="50px"
        alignItems="center"
        justifyContent="space-around"
      >
        <VStack minW="500px" w="60%" alignSelf="flex-end">
          {/* Club announcements. map the announcement reference to a Post card, since an announcement is just a post*/}
          {group.announcements.map((announcement) => (
            <PostCard postRef={announcement} />
          ))}
        </VStack>
        <VStack
          overflowY="scroll"
          w="30%"
          // maxW="300px"
          minW="200px"
          h="100%"
          maxH={["300px", "600px"]}
          m="15px"
        >
          <Text fontSize="2em" mb="20px">
            Members
          </Text>
          {group.members.map((member) => (
            <MemberCard username={member.id} />
          ))}
        </VStack>
      </HStack>
    </Flex>
  );
};

export default Group;
