import {
    Badge,
    Text,
    Image,
    Flex,
    Heading,
    VStack,
    HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Group } from "../../firestoreTypes";
import { defaultGroupImage } from "../../objectDefaults";
import { getGroupAvatarURL } from "../../storageHelpers";
import { convertAgeRange } from "../../stringConverters";
import { groupCategoryColorMapping } from "../../typeMappings";

interface Props {
    group: Group;
    groupID: string;
}
const InlineGroupCard = ({ group, groupID }: Props) => {
    const router = useRouter();
    const [url, setUrl] = useState<string>(defaultGroupImage);
    useEffect(() => {
        if (groupID) {
            getGroupAvatarURL(groupID).then((newURL) => {
                setUrl(newURL);
            });
        }
    }, []);
    return (
        <Flex
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            w="100%"
            maxW="500px"
            height="100px"
            bg="white"
            borderBottom="8px solid"
            borderColor="main"
            textAlign="left"
            verticalAlign="center"
            borderRadius="3px"
            boxShadow="0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
            paddingTop="0px"
            transitionProperty="all"
            transitionDuration="0.3s"
            _hover={{
                cursor: "pointer",
                boxShadow:
                    "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
            }}
            onClick={() => {
                router.push("./group/" + groupID);
            }}
            textColor="black"
        >
            <Image src={url} h="92px" borderRadius="3px 0 0 0" width="auto" />
            <VStack marginX="15px">
                <Heading fontSize="1.8rem" noOfLines={1}>
                    {group.name}
                </Heading>
                <Flex
                    flexDir="row"
                    justifyContent="space-around"
                    justifySelf="flex-end"
                    py="10px"
                    w="100%"
                >
                    <Badge
                        borderRadius="full"
                        px="2"
                        backgroundColor="main"
                        textColor="pureWhite"
                    >
                        {"Ages: " + convertAgeRange(group.ageRange)}
                    </Badge>
                    {group.category ? (
                        <Badge
                            borderRadius="full"
                            px="2"
                            backgroundColor={groupCategoryColorMapping.get(
                                group.category
                            )}
                            textColor="pureWhite"
                        >
                            {group.category}
                        </Badge>
                    ) : (
                        <></>
                    )}
                </Flex>
            </VStack>
        </Flex>
    );
};

export default InlineGroupCard;
