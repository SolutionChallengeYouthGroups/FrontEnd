import { Text, Icon, HStack, StackProps } from "@chakra-ui/react";
import React from "react";
interface Props extends StackProps {
  text: string;
  icon: any;
}

const TextWithIcon = ({text, icon, ...rest}: Props) => {return (
    <HStack {...rest}>
      <Icon as={icon} color="black"/>
      <Text paddingBottom="2px">{text}</Text>
    </HStack>
  );
};

export default TextWithIcon;
