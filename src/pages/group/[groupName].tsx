import React from "react";
import { useRouter } from "next/dist/client/router";

// Chakra-UI
import { VStack, Text, Image, Flex, HStack } from "@chakra-ui/react";

// Firestore stuff:
import { groups } from "../../firestoreCollections";
import { useGet } from "@typesaurus/react";

// Custom Components:
import LinkWithIcon from "../../components/LinkWithIcon";
import MemberCard from "../../components/MemberCard";
import PostCard from "../../components/PostCard";

const Group = () => {
  // page for any kind of youth club, with their name location, contact details, members etc...
  // can be customized by the owner of the youth club
  const router = useRouter();
  let { groupName } = router.query;
  if (typeof groupName != "string") {
    groupName = "";
  }

  const [group, { loading, error }] = useGet(groups, groupName);
  if (loading) {
    return <div>loading</div>;
  }
  if (error || !group) {
    return <div>{JSON.stringify(error)}</div>;
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
        <Text fontSize="3em">{groupName}</Text>

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
          {group.data.announcements.map((announcement) => (
            <PostCard postRef={announcement} key={announcement.id} />
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
          {group.data.members.map((member) => (
            <MemberCard userRef={member} key={member.id} />
          ))}
        </VStack>
      </HStack>
    </Flex>
  );
};

export default Group;
