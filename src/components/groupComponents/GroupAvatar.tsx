// react
import React, { useState } from "react";

import { getGroupAvatarURL, uploadGroupImage } from "../../storageHelpers";

//chakra
import { Text, Avatar, Box, Button, Icon } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

interface Props {
    // group id:
    groupID?: string;
    editable: boolean;
}

const GroupAvatar = ({ editable, groupID }: Props) => {
    // indicates if the edit is being hovered or not
    const [hoveringEdit, setHoveringEdit] = useState<boolean>(false);
    // state that will force component to realod
    const [fetchDate, setFetchDate] = useState<string>(
        new Date().getTime().toString()
    );
    let fileInput: HTMLInputElement | null = null;
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (groupID && e.currentTarget.files) {
            uploadGroupImage(e.currentTarget.files[0], groupID).then(() => {
                // update the date to refresh the component and fetch the image again
                setFetchDate(new Date().getTime().toString());
            });
        }
    };

    return (
        <div
            onMouseEnter={() => setHoveringEdit(true && editable)}
            onMouseLeave={() => setHoveringEdit(false)}
        >
            <Avatar
                src={
                    groupID
                        ? getGroupAvatarURL(groupID) +
                          "&" +
                          // add the date, to force the browser to fetch the image (prevent caching)
                          fetchDate
                        : ""
                }
                width="100px"
                height="100px"
                margin="20px"
                opacity={hoveringEdit ? 0.1 : 1}
            ></Avatar>
            {hoveringEdit ? (
                <EditIcon
                    _hover={{ cursor: "pointer" }}
                    position="absolute"
                    color="black"
                    transform="translate(-95px,40px)"
                    opacity={100}
                    fillOpacity={1}
                    width="50px"
                    height="50px"
                    onClick={() => {
                        if (fileInput) {
                            fileInput.click();
                        }
                    }}
                />
            ) : (
                " "
            )}
            {/* Invisible input to be clicked when the edit icon is cliked */}
            <input
                type="file"
                accept="image/png"
                hidden={true}
                ref={(input) => {
                    fileInput = input;
                }}
                onChange={handleImageUpload}
            />
        </div>
    );
};

export default GroupAvatar;
