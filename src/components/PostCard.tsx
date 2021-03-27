import React from "react";

import { Post } from "../firestoreTypes";

import { Text, Box, Flex, Grid, Stack, Heading } from "@chakra-ui/react";
import { Ref } from "typesaurus";
import { useGet } from "@typesaurus/react";
import { users } from "../firestoreCollections";

interface Props {
    post: Post;
}

const PostCard = ({ post }: Props) => {
    const [author, { loading, error }] = useGet(users, post.author.id);
    // @ts-ignore
    let createdDate = new Date(post.createdAt);
    return (
        <Flex
            flexDirection="column"
            marginY="10px"
            justifyContent="start"
            alignItems="flex-start"
            gap="10px"
        >
            <Heading size="md">{post.title}</Heading>
            <Text size="small" color="grey">
                {author?.data.username}&bull; {createdDate.toDateString()}
            </Text>
            <Text marginTop="10px">{post.content}</Text>
            <Stack dir="row"></Stack>
        </Flex>
    );
};

export default PostCard;
