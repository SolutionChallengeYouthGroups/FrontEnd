import { Text, Icon, HStack, StackProps } from "@chakra-ui/react";
import React from "react";
interface Props extends StackProps {
    text: string;
    icon?: any;
    iconColor?: string;
}

const TextWithIcon = ({ text, icon, iconColor, ...rest }: Props) => {
    return (
        <HStack {...rest}>
            {icon ? <Icon as={icon} color={iconColor || "black"} /> : <></>}
            <Text paddingBottom="2px">{text}</Text>
        </HStack>
    );
};

export default TextWithIcon;
