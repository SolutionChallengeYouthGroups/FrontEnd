import React, { useEffect, useState } from "react";

// NextJS Stuff
import Link from "next/link";

// CSS stuff
import { Text, VStack, Button } from "@chakra-ui/react";

// Components
import TopNav from "../components/TopNav";

//firebase
import { db } from "../firebase";
import { Group } from "../types";

const Index = () => {
  // main homepage
  const [groups, setGroups] = useState<Group[]>([]);
  useEffect(() => {
    db.collection("users")
      .get()
      .then((results) => {
        results.forEach((re) => {
          const data = re.data();
          console.log(data);
        });
      });
    // useEffect will make sure I only request data on the first render
    db.collection("groups")
      .get()
      .then((results) => {
        results.forEach((re) => {
          const data = re.data();
          console.log(data);
          let group: Group = {
            id: re.id,
            name: data.name,
            description: data.description,
            location: data.location,
            type: data.type,
            owner: data.owner,
            chat: re.ref.collection("chat"),
            announcements: re.ref.collection("announcements"),
          };
          setGroups([...groups, group]);
        });
      });
  }, []);
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
        <Text>{JSON.stringify(groups)}</Text>
      </VStack>
    </VStack>
  );
};

export default Index;
