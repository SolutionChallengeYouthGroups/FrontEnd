import { Group, SocialLinks } from "../../firestoreTypes";
import { SimpleGrid, SimpleGridProps } from "@chakra-ui/react";
import React from "react";
import PhoneLink from "./PhoneLink";
import EmailLink from "./EmailLink";
import ValidatedLinkWithIcon from "./ValidatedLinkWithIcon";
import WhatsAppLink from "./WhatsAppLink";

interface Props extends SimpleGridProps {
    group: Group;
    edit?: boolean;
    columns?: number;
}

const SocialGrid = ({ group, edit, columns, ...rest }: Props) => {
    return (
        <SimpleGrid
            columns={columns || 2}
            spacingY="5px"
            spacingX="50px"
            padding="0px 20px"
            {...rest}
        >
            <EmailLink links={group.links} edit={edit} />
            <PhoneLink links={group.links} edit={edit} />
            <ValidatedLinkWithIcon
                links={group.links}
                expectedHost="none"
                edit={edit}
            />
            <WhatsAppLink links={group.links} edit={edit} />
            <ValidatedLinkWithIcon
                links={group.links}
                expectedHost="facebook.com"
                edit={edit}
            />
            <ValidatedLinkWithIcon
                links={group.links}
                expectedHost="twitter.com"
                edit={edit}
            />
            <ValidatedLinkWithIcon
                links={group.links}
                expectedHost="instagram.com"
                edit={edit}
            />
        </SimpleGrid>
    );
};

export default SocialGrid;
