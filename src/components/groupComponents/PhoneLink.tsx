import { FaPhoneAlt } from "react-icons/fa";
import React, { HTMLProps, useState } from "react";
import isMobilePhone from "validator/lib/isMobilePhone";
import LinkWithIcon from "./../LinkWithIcon";
import { SocialLinks } from "../../firestoreTypes";
import { Box, BoxProps, HStack, Icon, Input } from "@chakra-ui/react";

interface Props extends BoxProps {
    links: SocialLinks;
    edit?: boolean;
}

const PhoneLink = ({ links, edit, ...rest }: Props) => {
    const [phone, setPhoneState] = useState(links.phone);
    function setPhone(phone: string) {
        links.phone = phone;
        setPhoneState(phone);
    }
    if (edit === true) {
        return (
            <Box {...rest}>
                <HStack>
                    <Icon as={FaPhoneAlt} />
                    <Input
                        value={links.phone}
                        onChange={(e) => setPhone(e.target.value)}
                        size="xs"
                        placeholder="Phone number"
                    />
                </HStack>
            </Box>
        );
    }
    let newNumber = links.phone.replace(/\+0*|\-|\(|\)/g, "");
    let link = "tel:" + newNumber;
    if (isMobilePhone(newNumber)) {
        return (
            <LinkWithIcon
                text={"+" + newNumber}
                icon={FaPhoneAlt}
                link={link}
                {...rest}
            />
        );
    }
    return <></>;
};

export default PhoneLink;
