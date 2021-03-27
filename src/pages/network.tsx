import { Flex } from "@chakra-ui/react";
import { useAll } from "@typesaurus/react";
import React from "react";
import PostCard from "../components/PostCard";
import { posts } from "../firestoreCollections";

interface Props {}

const network = (props: Props) => {
    let [allPosts, { loading, error }] = useAll(posts);
    if (loading || error || !allPosts) {
        allPosts = [];
    }
    return (
        <Flex>
            {allPosts.map((post) => (
                <PostCard post={post.data} />
            ))}
        </Flex>
    );
};

export default network;
