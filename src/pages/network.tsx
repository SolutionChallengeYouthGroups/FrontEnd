import { Flex, Spinner } from "@chakra-ui/react";
import { useAll, useOnAll, useOnQuery } from "@typesaurus/react";
import React, { useState } from "react";
import { Doc, limit, order, remove } from "typesaurus";
import PostCreator from "../components/forms/PostCreator";
import PostCard from "../components/cards/PostCard";
import TopNav from "../components/TopNav";
import { posts } from "../firestoreCollections";
import _ from "lodash";
import { Post } from "../firestoreTypes";

interface Props {}

const network = (props: Props) => {
    let [allPosts, { loading, error }] = useOnQuery(posts, [
        order("createdAt", "asc"),
    ]);
    if (error || !allPosts) {
        allPosts = [];
    }
    async function deletePost(post: Doc<Post>) {
        await remove(posts, post.ref.id);
    }
    if (loading) {
        return (
            <Spinner position="absolute" top="50%" left="50%" color="main" />
        );
    }
    return (
        <Flex
            flexDir="column"
            justifyContent="flex-start"
            alignItems="center"
            w="100%"
            maxW="800px"
            marginX="auto"
            paddingBottom="100px"
        >
            <PostCreator />
            {allPosts.map((post, i) => (
                <PostCard
                    post={post.data}
                    id={post.ref.id}
                    key={post.ref.id}
                    deleteCallback={() => deletePost(post)}
                />
            ))}
        </Flex>
    );
};

export default network;
