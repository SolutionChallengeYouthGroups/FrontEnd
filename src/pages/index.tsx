import React, { useState } from "react";

// NextJS Stuff

// CSS stuff
import { Grid, Text, VStack } from "@chakra-ui/react";

// Components
import TopNav from "../components/TopNav";
import SearchBox from "../components/search_page/SearchBox";
import Results from "../components/search_page/SearchResults";

const Index = () => {
    // Using useState, get input value from SearchBox and pass the new value of
    // search to the Results component
    const [search, setSearch] = useState("");
    return (
        <VStack
            width="100%"
            justifyContent="space-around"
            align="center"
            paddingBottom="20px"
            alignItems="center"
        >
            <SearchBox setSearch={setSearch} />
            <Results search={search} />
        </VStack>
    );
};

export default Index;
