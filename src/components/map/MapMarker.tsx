import {
    Box,
    ColorProps,
    HStack,
    Icon,
    IconProps,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { FaMapMarker } from "react-icons/fa";
import GroupCard from "../cards/GroupCard";

interface Props extends IconProps {
    lat: number;
    lng: number;
    popup?: JSX.Element;
    isOpen?: boolean;
    trigger: "click" | "hover" | undefined;
}

const MapMarker = ({ popup, isOpen, trigger, color, ...rest }: Props) => {
    // takes in a popup and will create a map maker, when clicked on will show the popup
    const focusRef = useRef(null);
    return popup ? (
        <Popover
            defaultIsOpen={!!isOpen}
            placement="top-end"
            initialFocusRef={focusRef}
            trigger={trigger}
        >
            <PopoverTrigger>
                <Box marginTop="-17px">
                    <Icon
                        transform="translate(-50%, -100%);"
                        filter="blur(2px);"
                        as={FaMapMarker}
                        color="black"
                        h="34px"
                        w="auto"
                        position="absolute"
                        top="1px"
                        left="1px"
                    />
                    <Icon
                        h="34px"
                        w="auto"
                        transform="translate(-50%, -100%);"
                        as={FaMapMarker}
                        color={color || "main"}
                        _hover={{
                            cursor: "pointer",
                            filter: "brightness(0.8)",
                        }}
                        position="absolute"
                        top="0px"
                        left="0px"
                        {...rest}
                    />
                </Box>
            </PopoverTrigger>
            <PopoverContent
                bg="transparent"
                minWidth="1000px"
                border="transparent"
            >
                <HStack>
                    <Box ref={focusRef}>{popup}</Box>
                </HStack>
            </PopoverContent>
        </Popover>
    ) : (
        <Box marginTop="-17px">
            <Icon
                transform="translate(-50%, -100%);"
                filter="blur(2px);"
                as={FaMapMarker}
                color="black"
                h="34px"
                w="auto"
                position="absolute"
                top="1px"
                left="1px"
            />
            <Icon
                h="34px"
                w="auto"
                transform="translate(-50%, -100%);"
                as={FaMapMarker}
                color={color || "main"}
                position="absolute"
                top="0px"
                left="0px"
                {...rest}
            />
        </Box>
    );
};

export default MapMarker;
