import React, { HTMLProps, useState } from "react";
import isEmail from "validator/lib/isEmail";
import LinkWithIcon from "../LinkWithIcon";
import { EmailIcon, Icon } from "@chakra-ui/icons";
import { SocialLinks } from "../../firestoreTypes";
import { HStack } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";

interface Props extends HTMLProps<React.ReactFragment> {
    links: SocialLinks;
    edit?: boolean;
}

const EmailLink = ({ links, edit, ...rest }: Props) => {
    const [email, setEmailState] = useState(links.email);
    function setEmail(email: string) {
        links.email = email;
        setEmailState(email);
    }
    if (edit === true) {
        return (
            <React.Fragment {...rest}>
                <HStack>
                    <Icon as={EmailIcon} />
                    <Input
                        value={links.email}
                        onChange={(e) => setEmail(e.target.value)}
                        size="xs"
                        placeholder="Email address"
                    />
                </HStack>
            </React.Fragment>
        );
    }
    let link = "mailto:" + links.email;
    if (isEmail(links.email)) {
        return (
            <LinkWithIcon
                text={links.email}
                icon={EmailIcon}
                link={link}
                {...rest}
            />
        );
    }
    return <React.Fragment {...rest} />;
};

export default EmailLink;
