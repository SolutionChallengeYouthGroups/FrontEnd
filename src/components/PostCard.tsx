import React from "react";

import { Post } from "../firestoreTypes";
import { Box } from "@chakra-ui/react";
import { Ref } from "typesaurus";
import { useGet } from "@typesaurus/react";

interface Props {
  postRef: Ref<Post>;
}

const PostCard = ({ postRef }: Props) => {
  const [post] = useGet(postRef);
  return (
    <Box border="1px">
      title:{post?.data?.title}
      <br />
      content:{post?.data?.content}
    </Box>
  );
};

export default PostCard;
