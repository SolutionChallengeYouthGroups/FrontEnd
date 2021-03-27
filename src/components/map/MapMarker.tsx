import {
    Box,
    ColorProps,
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
import React, { useState } from "react";
import { FaMapMarker } from "react-icons/fa";
import GroupCard from "../GroupCard";

interface Props extends IconProps{
    lat: number;
    lng: number;
    popup?: JSX.Element;
    isOpen?: boolean;
}

const MapMarker = ({ popup, isOpen, color, ...rest }: Props) => {
    // takes in a popup and will create a map maker, when clicked on will show the popup
    return (
        popup ?
        <Popover defaultIsOpen={!!isOpen} placement="top-end">
            <PopoverTrigger>
                <Icon transform="translate(-50%, -100%);"
                    as={FaMapMarker}
                    color={color || "main"}
                    h="34px"
                    w="auto"
                    _hover={{ cursor: "pointer", color: "mainDark" }}
                    marginTop="-17px"
                    {...rest}
                />
            </PopoverTrigger>
            <PopoverContent w="300px">
                <PopoverBody>{popup}</PopoverBody>
            </PopoverContent>
        </Popover> : 
        <Icon transform="translate(-50%, -100%);"
            as={FaMapMarker}
            color={color || "main"}
            w="35px"
            h="35px"
            {...rest}/>
    );
};

export default MapMarker;
