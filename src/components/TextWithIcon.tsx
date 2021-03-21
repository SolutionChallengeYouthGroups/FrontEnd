import { Text, Icon, HStack, StackProps } from "@chakra-ui/react";
import React from "react";
interface Props extends StackProps {
  text: string;
  icon: any;
  textClassname?: string;
}

const TextWithIcon = ({text, icon, textClassname, ...rest}: Props) => {return (
    <HStack {...rest}>
      <Icon as={icon} />
      <Text className={textClassname || ""} paddingBottom="2px">{text}</Text>
    </HStack>
  );
};

export default TextWithIcon;
