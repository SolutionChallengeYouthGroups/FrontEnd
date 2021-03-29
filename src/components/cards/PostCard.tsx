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
    Icon,
    IconButton,
} from "@chakra-ui/react";
import { Ref } from "typesaurus";
import { useGet } from "@typesaurus/react";
import { users } from "../../firestoreCollections";
import { timestampToDate } from "../../storageHelpers";
import PostDownloads from "../network_page/PostDownloads";
import { ChevronDownIcon, DeleteIcon } from "@chakra-ui/icons";

interface Props {
    post: Post;
    id: string;
    deleteCallback?: () => void;
}

const PostCard = ({ post, id, deleteCallback }: Props) => {
    const [author, { loading, error }] = useGet(post.author);
    const [open, setOpen] = useState<boolean>(false);
    const user = firebase.auth().currentUser;
    let createdAt: Date = timestampToDate(post.createdAt);
    const rot = open ? 180 : 0;
    return (
        <Flex
            flexDirection="column"
            paddingY="10px"
            justifyContent="start"
            alignItems="flex-start"
            w="100%"
            _hover={{ cursor: "pointer" }}
            borderBottom="1px solid"
            borderColor="mainDark"
            onClick={() => setOpen(!open)}
            position="relative"
        >
            <Heading size="md">{post.title}</Heading>
            <Text size="small" color="grey">
                {author?.data.username} &bull; {createdAt.toDateString()}
            </Text>
            <Collapse in={open}>
                <Text marginTop="10px">{post.content}</Text>
                <PostDownloads postID={id} />
            </Collapse>
            {deleteCallback && post.author.id === user?.uid ? (
                <IconButton
                    aria-label="Delete post"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={(e) => {
                        deleteCallback();
                        e.stopPropagation();
                    }}
                    position="absolute"
                    top="15px"
                    right="60px"
                />
            ) : (
                <></>
            )}

            <Icon
                transform={"scale(2) rotate(" + rot + "deg);"}
                as={ChevronDownIcon}
                position="absolute"
                right="30px"
                top="28px"
                transitionDuration="0.2s;"
                transitionProperty="transform;"
            />
        </Flex>
    );
};

export default PostCard;
