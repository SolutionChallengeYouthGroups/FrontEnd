import React, { useState } from "react";


// NextJS Stuff

// CSS stuff
import { Grid, Text, VStack } from "@chakra-ui/react";

// Components
import TopNav from "../components/TopNav";
import SearchBox from "../components/search_page/SearchBox"
import Results from "../components/search_page/SearchResults"

//firebase
import { useAll } from "@typesaurus/react";
import { groups } from "../firestoreCollections";
import Link from "next/link";
import GroupCard from "../components/GroupCard";

const Index = () => {
    // // getting all the groups from firestore
    // let [allGroups, { loading, error }] = useAll(groups);
    // if (loading || error || !allGroups) {
    //     // if it is loading/there is an error, set allGroups to [], so that the .map still works
    //     allGroups = [];
    // }
    const [search, setSearch] = useState("");
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
                <SearchBox setSearch={setSearch} />
                <Results search={search}/>
            </VStack>
        </VStack>
    );
};

export default Index;