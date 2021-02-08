import React from "react";
import { useRouter } from "next/dist/client/router";

// Chakra-UI
import { VStack, Text, Image, Flex, HStack, SimpleGrid, Spacer } from "@chakra-ui/react";

// Firestore stuff:
import { groups } from "../../firestoreCollections";
import { useGet } from "@typesaurus/react";

// Custom Components:
import LinkWithIcon from "../../components/TextWithIcon";
import Head from "next/head";
import SocialGrid from "../../components/SocialGrid";

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
        wrap="wrap"
        w="100%"
        alignItems="center"
        boxShadow="0 10px 5px -5px rgba(0, 0, 0, 0.2)"
        borderRadius="30px"
        justifyContent="space-evenly"
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
        <Text fontSize="3em">{group.data.name}</Text>
        <Spacer/>
        <SocialGrid links={group.data.links}/>

      </Flex>

      <HStack
        wrap="wrap-reverse"
        w="90%"
        margin="50px"
        alignItems="center"
        justifyContent="space-around"
      >
        <VStack minW="500px" w="60%" alignSelf="flex-end">
        </VStack>
        <Image src="https://via.placeholder.com/200?text=Google+Maps+Placeholder"/>
      </HStack>
    </Flex>
  );
};

export default Group;
