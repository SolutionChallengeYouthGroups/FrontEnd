import { Heading, Text, Flex, Image, Badge } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Group } from "../../firestoreTypes";
import { getGroupAvatarURL } from "../../storageHelpers";
import { useRouter } from "next/router";
import { convertAgeRange } from "../../stringConverters";
import { groupCategoryColorMapping } from "../../typeMappings";
import { defaultGroupImage } from "../../objectDefaults";

interface Props {
    group: Group;
    groupID: string;
}

const GroupCard = ({ group, groupID }: Props) => {
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
            bg="white"
            direction="column"
            borderBottom="8px solid"
            borderColor="main"
            textAlign="left"
            verticalAlign="center"
            borderRadius="3px"
            boxShadow="0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
            w="100%"
            maxW="400px"
            paddingTop="0px"
            transitionProperty="all"
            transitionDuration="0.3s"
            justifyContent="space-between" // space-between so that image and badge flex are at the ends
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
            <Image
                src={url}
                maxH="200px"
                w="auto"
                borderRadius="3px"
                flex="auto"
                objectFit="cover"
                objectPosition="50% 30%" // 30% so that default group image head doesn't get cropped too much
            />
            <Flex
                flexDir="column"
                justifyContent="flex-end"
                px="16px"
                py="10px"
            >
                <Text textColor="gray.700" flex="auto" noOfLines={1}>
                    {group.description}
                </Text>
                <Heading fontSize="1.5rem" noOfLines={1}>
                    {group.name}
                </Heading>
            </Flex>
            <Flex
                flexDir="row"
                borderTop="1px solid"
                borderColor="gray.300"        
                justifyContent="space-around"
                justifySelf="flex-end"
                py="10px"
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
        </Flex>
    );
};

export default GroupCard;
