import { Icon } from "@chakra-ui/icons";
import React, { useState } from "react";
import isURL from "validator/lib/isURL";
import LinkWithIcon from "../LinkWithIcon";
import { socialLinkMapping } from "../../typeMappings";
import { Host } from "../../helperTypes";
import { getSocialPropFromHost, title } from "../../helperFunctions";
import { SocialLinks } from "../../firestoreTypes";
import _ from "lodash";
import { Box, BoxProps, HStack } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/react";

interface Props extends BoxProps {
    links: SocialLinks;
    edit?: boolean;
    expectedHost: Host;
}
// create a mapping between the host and icons

const ValidatedLinkWithIcon = ({
    links,
    edit,
    expectedHost,
    ...rest
}: Props) => {
    const prop = getSocialPropFromHost(expectedHost);
    let value = _.get(links, prop);
    const icon = socialLinkMapping.get(expectedHost);
    const [link, setLinkState] = useState(value);
    function setLink(link: string) {
        _.set(links, prop, link);
        setLinkState(link);
    }
    if (edit === true) {
        return (
            <Box {...rest}>
                <HStack>
                    <Icon as={icon} />
                    <Input
                        value={value}
                        onChange={(e) => setLink(e.target.value)}
                        size="xs"
                        placeholder={title(prop)}
                    />
                </HStack>
            </Box>
        );
    }
    // depending on what link it is, render a different icon + text etc ...
    // E.g. a discord link would have a discord Icon Discord written next to it
    if (value.slice(0, 4) !== "http") {
        value = "https://" + value;
    }
    if (!isURL(value)) {
        return <></>;
    }
    if (expectedHost === "none") {
        return (
            <LinkWithIcon
                text={value.replace(/https?:\/\//, "")}
                icon={icon}
                link={value}
                {...rest}
            />
        );
    }
    // probably a better way of checking but this will do for the time being
    if (value.includes(expectedHost)) {
        return (
            <LinkWithIcon
                text={title(prop)}
                icon={icon}
                link={value}
                {...rest}
            />
        );
    }
    return <></>;
};

export default ValidatedLinkWithIcon;
