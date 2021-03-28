import { Flex } from "@chakra-ui/react";
import { useAll } from "@typesaurus/react";
import React from "react";
import PostCreator from "../components/forms/PostCreator";
import PostCard from "../components/PostCard";
import TopNav from "../components/TopNav";
import { posts } from "../firestoreCollections";

interface Props {}

const network = (props: Props) => {
    let [allPosts, { loading, error }] = useAll(posts);
    if (loading || error || !allPosts) {
        allPosts = [];
    }
    return (
        <Flex
            paddingTop="16vh"
            flexDir="column"
            justifyContent="flex-start"
            alignItems="flex-start"
        >
            <TopNav />
            <PostCreator />
            {allPosts.map((post) => (
                <PostCard post={post.data} />
            ))}
        </Flex>
    );
};

export default network;
