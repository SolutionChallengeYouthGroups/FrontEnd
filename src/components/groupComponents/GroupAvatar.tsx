import { Avatar } from "@chakra-ui/react";
import React from "react";
import { getGroupAvatarURL } from "../../storageHelpers";

interface Props {
    // group id:
    groupID?: string;
}

const GroupAvatar = ({ groupID }: Props) => {
    return (
        <Avatar
            src={groupID ? getGroupAvatarURL(groupID) : ""}
            width="100px"
            height="100px"
            margin="20px"
        >
            POTATO
        </Avatar>
    );
};

export default GroupAvatar;
