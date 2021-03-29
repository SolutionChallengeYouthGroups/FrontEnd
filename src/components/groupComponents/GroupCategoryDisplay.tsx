import { GroupCategories, Group, GroupCategory } from "../../firestoreTypes";
import styles from "../componentStyles.module.css";
import TextWithIcon from "../TextWithIcon";
import {
    groupCategoryColorMapping,
    groupCategoryMapping,
} from "../../typeMappings";
import { title } from "../../helperFunctions";
import { HTMLProps } from "react";
import { Box, BoxProps, HStack, Icon, Select } from "@chakra-ui/react";
import React, { useState } from "react";

interface Props extends BoxProps {
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
        return <></>;
    }
    if (!!edit) {
        return (
            <Box {...rest}>
                <HStack>
                    {group.category == "" || group.category == "other" ? (
                        <></>
                    ) : (
                        <Icon as={groupCategoryMapping.get(group.category)} />
                    )}
                    <Select
                        bg={groupCategoryColorMapping.get(group.category)}
                        textColor="pureWhite"
                        value={group.category}
                        variant="outline"
                        onChange={(e) =>
                            setCategory(e.target.value as GroupCategory)
                        }
                    >
                        {GroupCategories.map((gc) => (
                            <option
                                key={gc}
                                value={gc}
                                style={{
                                    backgroundColor: groupCategoryColorMapping.get(
                                        gc as GroupCategory
                                    ),
                                }}
                            >
                                {title(gc)}
                            </option>
                        ))}
                    </Select>
                </HStack>
            </Box>
        );
    }
    return (
        <TextWithIcon
            title="Group Category"
            text={title(group.category)}
            color="pureWhite"
            icon={groupCategoryMapping.get(group.category)}
            iconColor="white"
            bg={groupCategoryColorMapping.get(group.category)}
            padding="5px"
            borderRadius="10px"
            paddingX="8px"
            {...rest}
        />
    );
};

export default GroupCategoryDisplay;
