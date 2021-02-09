import { Text, Icon, HStack } from "@chakra-ui/react";
import React from "react";
interface Props {
  text: string;
  icon: any;
  classname?: string;
  title?: string;
}

const TextWithIcon = (props: Props) => {return (
    <HStack title={props.title || ""}>
      <Icon as={props.icon} />
      <Text className={props.classname || ""} paddingBottom="2px">{props.text}</Text>
    </HStack>
  );
};

export default TextWithIcon;
