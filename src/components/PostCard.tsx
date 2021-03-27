import React from "react";

import { Post } from "../firestoreTypes";
import { Box, Flex, Grid } from "@chakra-ui/react";
import { Ref } from "typesaurus";
import { useGet } from "@typesaurus/react";

interface Props {
    post: Post;
}

const PostCard = ({ post }: Props) => {
    return <Grid templateAreas=""></Grid>;
};

export default PostCard;
