import { Links } from "../firestoreTypes";
import { SimpleGrid } from "@chakra-ui/react"
import React from "react";
import PhoneLink from "./PhoneLink";
import EmailLink from "./EmailLink";
import ValidatedLinkWithIcon from "./ValidatedLinkWithIcon";
import WhatsAppLink from "./WhatsAppLink";

interface Props{
    links: Links;
    columns?: number;
}

const SocialGrid = (props: Props) => {
    return (
    <SimpleGrid columns={props.columns || 2} spacingY="5px" spacingX="50px">
        <EmailLink email={props.links.email}/>
        <PhoneLink phoneNumber={props.links.phone}/>
        <ValidatedLinkWithIcon link={props.links.website}/>
        <WhatsAppLink phoneNumber={props.links.whatsapp}/>
        <ValidatedLinkWithIcon link={props.links.facebook} expectedHost="facebook.com"/>
        <ValidatedLinkWithIcon link={props.links.twitter} expectedHost="twitter.com"/>
        <ValidatedLinkWithIcon link={props.links.instagram} expectedHost="instagram.com"/>
    </SimpleGrid>
    )
}

export default SocialGrid;