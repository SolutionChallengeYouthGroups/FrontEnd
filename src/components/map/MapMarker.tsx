import {
    Box,
    Icon,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaMapMarker } from "react-icons/fa";
import GroupCard from "../GroupCard";

interface Props {
    lat: number;
    lng: number;
    popup?: JSX.Element;
}

const MapMarker = ({ popup }: Props) => {
    return (
        <Popover>
            <PopoverTrigger>
                <Icon
                    as={FaMapMarker}
                    color="main"
                    w="35px"
                    h="35px"
                    _hover={{ cursor: "pointer" }}
                />
            </PopoverTrigger>
            <PopoverContent w="300px">
                <PopoverBody>{popup}</PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default MapMarker;
