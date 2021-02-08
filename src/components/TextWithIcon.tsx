import { Text, Icon, HStack } from "@chakra-ui/react";
import React from "react";

interface Props {
  text: string;
  icon: any;
}

const TextWithIcon = (props: Props) => {
  // depending on what link it is, render a different icon + text etc ...
  // E.g. a discord link would have a discord Icon Discord written next to it
  return (
    <HStack>
      <Icon as={props.icon} />
      <Text paddingBottom="2px">{props.text}</Text>
    </HStack>
  );
};

export default TextWithIcon;
