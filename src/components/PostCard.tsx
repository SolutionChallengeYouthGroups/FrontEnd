import React, { useEffect, useState } from "react";

import { DocumentReference } from "@firebase/firestore-types";
import { Post } from "../types";
import { Box } from "@chakra-ui/react";

interface Props {
  postRef: DocumentReference;
}

const PostCard = (props: Props) => {
  const [post, setPost] = useState<Post | undefined>(undefined);
  useEffect(() => {
    props.postRef.get().then(async (result) => {
      let data = result.data();
      console.log(data);
      setPost({
        title: data?.title,
        content: data?.content,
        comments: result.ref.collection("comments"),
        createdAt: data?.createdAt,
        author: data?.author,
      });
    });
  }, []);
  return (
    <Box border="1px">
      title:{post?.title}
      <br />
      content:{post?.content}
    </Box>
  );
};

export default PostCard;
