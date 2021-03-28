import { FaWhatsapp } from "react-icons/fa";
import React, { HTMLProps, useState } from "react";
import isMobilePhone from "validator/lib/isMobilePhone";
import LinkWithIcon from "../LinkWithIcon";
import { SocialLinks } from "../../firestoreTypes";
import { Box, BoxProps, HStack, Icon, Input } from "@chakra-ui/react";

interface Props extends BoxProps {
    links: SocialLinks;
    edit?: boolean;
}

const WhatsAppLink = ({ links, edit, ...rest }: Props) => {
    const [whatsapp, setWAState] = useState(links.whatsapp);
    function setWA(wa: string) {
        links.whatsapp = wa;
        setWAState(wa);
    }
    if (edit === true) {
        return (
            <Box {...rest}>
                <HStack>
                    <Icon as={FaWhatsapp} />
                    <Input
                        value={links.whatsapp}
                        onChange={(e) => setWA(e.target.value)}
                        size="xs"
                        placeholder="WhatsApp number"
                    />
                </HStack>
            </Box>
        );
    }
    // removes chars that are not friendly
    let newNumber = links.whatsapp.replace(/\+0*|\-|\(|\)/g, "");
    if (isMobilePhone(newNumber)) {
        let link = "https://wa.me/" + newNumber;
        return (
            <LinkWithIcon
                text={"+" + newNumber}
                icon={FaWhatsapp}
                link={link}
                {...rest}
            />
        );
    }
    return <></>;
};

export default WhatsAppLink;
