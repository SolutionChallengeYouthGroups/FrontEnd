import React from "react";

// NextJS Stuff

// CSS stuff
import { Text, VStack } from "@chakra-ui/react";

// Components
import TopNav from "../components/TopNav";

//firebase
import { useAll } from "@typesaurus/react";
import { groups } from "../firestoreCollections";

const Index = () => {
  const [allGroups, { loading, error }] = useAll(groups);
  if (loading) {
    return <div>loading</div>;
  }
  if (error || !allGroups) {
    return <div>{JSON.stringify(error)}</div>;
  }
  return (
    <VStack
      height="100vh"
      align="center"
      justifyContent="flex-start"
      spacing="100"
    >
      <TopNav />
      <VStack
        width="100%"
        maxW="800px"
        justifyContent="space-around"
        align="center"
      >
        <Text>list of clubs fetched from firebase firestore</Text>
        <Text>{allGroups.map((group) => JSON.stringify(group))}</Text>
      </VStack>
    </VStack>
  );
};

export default Index;
