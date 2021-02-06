import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Text, Box, Icon, HStack } from "@chakra-ui/react";
import { FaDiscord } from "react-icons/fa";
import Link from "next/link";
import React from "react";

interface Props {
  link: string;
}

const LinkWithIcon = (props: Props) => {
  // depending on what link it is, render a different icon + text etc ...
  // E.g. a discord link would have a discord Icon Discord written next to it
  if (props.link.includes("discord")) {
    return (
      <Box>
        <a href="https://discord.com" target="_blank">
          <HStack>
            <Icon as={FaDiscord} />
            <Text>Discord</Text>
            <ExternalLinkIcon />
          </HStack>
        </a>
      </Box>
    );
  }
  return <></>;
};

export default LinkWithIcon;
