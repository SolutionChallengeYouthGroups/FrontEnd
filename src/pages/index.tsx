import React from "react";

// NextJS Stuff

// CSS stuff
import { Grid, Text, VStack } from "@chakra-ui/react";

// Components
import TopNav from "../components/TopNav";

//firebase
import { useAll } from "@typesaurus/react";
import { groups } from "../firestoreCollections";
import Link from "next/link";
import GroupCard from "../components/GroupCard";

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
        maxW="90vw"
        justifyContent="space-around"
        align="center"
      >
        <Grid gap="15px" w="90%" templateColumns="repeat(auto-fill,minmax(350px,1fr))" >
          {allGroups.map((group) => (
            <GroupCard group={group.data} id={group.ref.id} />
          ))}
        </Grid>
      </VStack>
    </VStack>
  );
};

export default Index;
