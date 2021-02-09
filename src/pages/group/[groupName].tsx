import React from "react";
import { useRouter } from "next/dist/client/router";

// Chakra-UI
import { VStack, Text, Image, Flex, HStack, Spacer } from "@chakra-ui/react";

// Firestore stuff:
import { groups } from "../../firestoreCollections";
import { useGet } from "@typesaurus/react";

// Custom Components:
import AgeRangeDisplay from "../../components/AgeRangeDisplay";
import Head from "next/head";
import SocialGrid from "../../components/SocialGrid";
import MeetingTimeDisplay from "../../components/MeetingTimeDisplay";

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
      <Head>
        <title>{group.data.name}</title>
      </Head>
      <Flex
        w="100%"
        alignItems="center"
        boxShadow="0 10px 5px -5px rgba(0, 0, 0, 0.2)"
        borderRadius="30px"
        justifyContent="normal"
        minH="100%"
      >
        {/* Top bar with basic information */}
        <Image
          src="https://via.placeholder.com/100"
          maxH="100%"
          maxW="100%"
          borderRadius="full"
          p="20px"
        />
        <VStack flex="1 1 0" minWidth="0">
          <Text title={group.data.name} maxWidth="100%" isTruncated={true} fontSize="2.5em">{group.data.name}</Text>
          <HStack alignItems="center" justifyContent="space-evenly" width="100%">
            <AgeRangeDisplay range={group.data.ageRange}/>
            <MeetingTimeDisplay meetingTimes={group.data.meetingTimes}/>
          </HStack>
        </VStack>
        <SocialGrid links={group.data.links}/>

      </Flex>

      <HStack
        wrap="wrap"
        w="90%"
        margin="50px"
        alignItems="normal"
        justifyContent="space-between"
      >
        <VStack alignItems="normal" w="40%">
          <Text fontSize="1.5em" fontWeight="bold">Group Description:</Text>
          <Text paddingLeft="10px">{group.data.description}</Text>
        </VStack>
        <Image src="https://via.placeholder.com/200?text=Google+Maps+Placeholder"/>
      </HStack>
    </Flex>
  );
};

export default Group;
