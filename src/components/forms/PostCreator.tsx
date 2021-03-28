import { Flex, Icon, Input, Stack, Textarea } from "@chakra-ui/react";
import React, { createRef, MouseEventHandler, useRef } from "react";
import { AiFillFileImage } from "react-icons/ai";

interface Props {}



const PostCreator = (props: Props) => {
    let fileInput: HTMLInputElement | null = null;
    const [image,setImage] = useState()

    const callUploadImage = () => {
        if (fileInput) {
            fileInput.click();
        }
    };
    const handleImageUpload = (
        e: React.MouseEvent<HTMLInputElement, MouseEvent>
    ) => {
        if (e.currentTarget.files){

        }
    };

    return (
        <Flex>
            <Textarea placeholder="Write new post" />
            <Stack>
                <Input
                    type="file"
                    hidden={true}
                    ref={(input) => {
                        fileInput = input;
                    }}
                    onClick={handleImageUpload}
                />
                <Icon
                    as={AiFillFileImage}
                    color="main"
                    onClick={callUploadImage}
                    _hover={{ cursor: "pointer" }}
                />
            </Stack>
        </Flex>
    );
};

export default PostCreator;
