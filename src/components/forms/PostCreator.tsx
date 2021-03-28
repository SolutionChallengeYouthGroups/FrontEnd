import {
    Button,
    Flex,
    Text,
    HStack,
    Icon,
    Input,
    Spacer,
    Stack,
    Textarea,
} from "@chakra-ui/react";
import React, { createRef, MouseEventHandler, useRef, useState } from "react";
import { AiFillFileImage } from "react-icons/ai";
import { add } from "typesaurus";
import { posts, users } from "../../firestoreCollections";
import { Post } from "../../firestoreTypes";
import { getCurrentUserRef, uploadPost } from "../../storageHelpers";
import firebase from "firebase";
import { IoConstructOutline } from "react-icons/io5";

interface Props {}

const PostCreator = (props: Props) => {
    let fileInput: HTMLInputElement | null = null;
    const [image, setImage] = useState<File>();
    const [post, setPost] = useState<{
        title: string;
        content: string;
        image?: File;
    }>({ title: "", content: "" });

    const callUploadImage = () => {
        if (fileInput) {
            fileInput.click();
        }
    };
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            setPost({ ...post, image: e.currentTarget.files[0] });
        }
    };

    const submit = async () => {
        let userRef = getCurrentUserRef();
        if (!userRef) {
            return;
        }
        let newPost = await add(posts, {
            author: userRef,
            content: post.content,
            title: post.title,
            createdAt: firebase.firestore.Timestamp.now(),
        });
        if (post.image) {
            uploadPost(post.image, newPost.id);
        }
    };
    console.log(post);

    const handleChange = (e: any) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <Flex
            flexDir="column"
            justifyContent="space-around"
            alignItems="flex-start"
            w="100%"
            paddingX="40px"
            paddingY="10px"
            _after={{
                content: `""`,
                borderBottom: "1px solid",
                borderColor: "main",
                w: "100%",
            }}
        >
            <Input
                placeholder="Title"
                w="100%"
                marginY="10px"
                name="title"
                onChange={handleChange}
            />
            <Textarea
                placeholder="Write new post"
                w="100%"
                resize="none"
                name="content"
                onChange={handleChange}
            />
            <Flex
                flexDir="row"
                justifyContent="flex-start"
                alignItems="center"
                w="100%"
                marginY="10px"
            >
                <input
                    type="file"
                    hidden={true}
                    ref={(input) => {
                        fileInput = input;
                    }}
                    onChange={handleImageUpload}
                />
                {/* <Input
                    type="file"
                    hidden={true}
                    ref={(input) => {
                        fileInput = input;
                    }}
                    onChange={handleImageUpload}
                /> */}
                <Icon
                    as={AiFillFileImage}
                    color="main"
                    onClick={callUploadImage}
                    _hover={{ cursor: "pointer", color: "mainDark" }}
                    w="30px"
                    h="auto"
                    marginX="15px"
                />
                <Text>{image?.name}</Text>
                <Spacer />
                <Button
                    variant="solid"
                    backgroundColor="main"
                    textColor="pureWhite"
                    _hover={{ backgroundColor: "mainDark" }}
                    onClick={submit}
                >
                    Post
                </Button>
            </Flex>
        </Flex>
    );
};

export default PostCreator;
