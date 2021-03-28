import React, { useState } from "react";

import { Post } from "../../firestoreTypes";
import firebase, { storage } from "../../firebase";

import {
    Text,
    Box,
    Flex,
    Grid,
    Stack,
    Heading,
    AccordionItem,
    Accordion,
    Collapse,
    HStack,
} from "@chakra-ui/react";
import { Ref } from "typesaurus";
import { useGet } from "@typesaurus/react";
import { users } from "../../firestoreCollections";
import { timestampToDate } from "../../storageHelpers";
import PostDownloads from "../network_page/PostDownloads";

interface Props {
    post: Post;
    id: string;
}

const PostCard = ({ post, id }: Props) => {
    const [author, { loading, error }] = useGet(users, post.author.id);
    const [open, setOpen] = useState<boolean>(false);
    let createdAt: Date = timestampToDate(post.createdAt);
    return (
        <Flex
            flexDirection="column"
            marginY="10px"
            justifyContent="start"
            alignItems="flex-start"
            gap="10px"
            w="100%"
            _hover={{ cursor: "pointer" }}
            borderBottom="1px solid"
            borderColor="mainDark"
        >
            <Heading size="md">{post.title}</Heading>
            <Text size="small" color="grey">
                {author?.data.username} &bull; {createdAt.toDateString()}
            </Text>
            <Collapse
                startingHeight={50}
                in={open}
                onClick={() => setOpen(!open)}
            >
                <Text marginTop="10px">{post.content}</Text>
                <PostDownloads postID={id} />
            </Collapse>
            <Stack dir="row"></Stack>
        </Flex>
    );
};

export default PostCard;
