// react
import React, { useEffect, useState } from "react";

import { getGroupAvatarURL, uploadGroupImage } from "../../storageHelpers";

//chakra
import { Text, Avatar, Box, Button, Icon } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { defaultGroupImage } from "../../objectDefaults";

interface Props {
    // group id:
    groupID?: string;
    editable: boolean;
    onSaveRef: [(groupID: string, newGroup: boolean) => Promise<void>];
}
const GroupAvatar = ({ editable, groupID, onSaveRef }: Props) => {
    // indicates if the edit is being hovered or not
    const [hoveringEdit, setHoveringEdit] = useState<boolean>(false);
    // url of the image
    const [url, setUrl] = useState<string>(defaultGroupImage);
    let fileInput: HTMLInputElement | null = null;
    function setSaveRef(file: File) {
        onSaveRef[0] = async (groupID: string, newGroup: boolean) => {
            let sh = await uploadGroupImage(file, groupID);
            if (!newGroup) {
                let newurl = await sh.ref.getDownloadURL();
                // set the new url to the image, to cause a refresh
                setUrl(newurl as string);
            }
        };
    }
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            setSaveRef(e.currentTarget.files[0]);
            setUrl(URL.createObjectURL(e.currentTarget.files[0]));
        }
    };
    useEffect(() => {
        // get the image url on first load:
        if (groupID) {
            getGroupAvatarURL(groupID).then((newURL) => {
                setUrl(newURL);
            });
        }
    }, [editable]);

    return (
        <div
            onMouseEnter={() => setHoveringEdit(true && editable)}
            onMouseLeave={() => setHoveringEdit(false)}
        >
            <Avatar
                src={url}
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
