import { Flex } from "@chakra-ui/react";
import { useAll, useOnAll, useOnQuery } from "@typesaurus/react";
import React from "react";
import { limit, order } from "typesaurus";
import PostCreator from "../components/forms/PostCreator";
import PostCard from "../components/cards/PostCard";
import TopNav from "../components/TopNav";
import { posts } from "../firestoreCollections";

interface Props {}

const network = (props: Props) => {
    let [allPosts, { loading, error }] = useOnQuery(posts, [
        order("createdAt", "asc"),
    ]);
    if (loading || error || !allPosts) {
        allPosts = [];
    }
    return (
        <Flex
            paddingTop="16vh"
            flexDir="column"
            justifyContent="flex-start"
            alignItems="center"
            paddingX="50px"
            w="100%"
            maxW="800px"
            marginX="auto"
        >
            <TopNav />
            <PostCreator />
            {allPosts.map((post) => (
                <PostCard post={post.data} id={post.ref.id} key={post.ref.id} />
            ))}
        </Flex>
    );
};

export default network;
