import { IconButton, IconButtonProps } from "@chakra-ui/react";

const FloatingButton = (params: IconButtonProps) => {
    return (
        <IconButton
            width="70px"
            height="70px"
            borderRadius="full"
            backgroundPosition="top"
            position="fixed"
            bottom="10px"
            right="10px"
            {...params}
        />
    );
};

export default FloatingButton;
