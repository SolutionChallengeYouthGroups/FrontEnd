import { GroupCategories, Group, GroupCategory } from "../../firestoreTypes";
import styles from "../componentStyles.module.css";
import TextWithIcon from "../TextWithIcon";
import { groupCategoryMapping } from "../../iconMappings";
import { title } from "../../helperFunctions";
import { HTMLProps } from "react";
import { HStack, Icon, Select } from "@chakra-ui/react";
import React, { useState } from "react";

interface Props extends HTMLProps<React.ReactFragment> {
    group: Group;
    edit?: boolean;
}
const GroupCategoryDisplay = ({ group, edit, ...rest }: Props) => {
    const [category, setCategoryState] = useState(group.category);

    function setCategory(category: GroupCategory) {
        group.category = category;
        setCategoryState(category);
    }
    if (group.category == "" && edit !== true) {
        return <React.Fragment {...rest} />;
    }
    if (edit !== undefined) {
        return (
            <React.Fragment {...rest}>
                <TextWithIcon
                    title="Group Category"
                    className={styles.greytext}
                    display={edit ? "none" : "flex"}
                    text={title(group.category)}
                    icon={groupCategoryMapping.get(group.category)}
                />
                <HStack display={edit ? "flex" : "none"}>
                    {group.category == "" ? (
                        <></>
                    ) : (
                        <Icon as={groupCategoryMapping.get(group.category)} />
                    )}
                    <Select
                        value={group.category}
                        variant="outline"
                        placeholder="Group category"
                        onChange={(e) =>
                            setCategory(e.target.value as GroupCategory)
                        }
                    >
                        {GroupCategories.map((gc) => (
                            <option key={gc} value={gc}>
                                {title(gc)}
                            </option>
                        ))}
                    </Select>
                </HStack>
            </React.Fragment>
        );
    }
    return (
        <React.Fragment {...rest}>
            <TextWithIcon
                title="Group Category"
                className={styles.greytext}
                text={title(group.category)}
                icon={groupCategoryMapping.get(group.category)}
            />
        </React.Fragment>
    );
};

export default GroupCategoryDisplay;
