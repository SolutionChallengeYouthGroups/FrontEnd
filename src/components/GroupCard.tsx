import { Heading, Text, Flex, Image, Badge } from "@chakra-ui/react";
import React from "react";
import { Group } from "../firestoreTypes";
import { getGroupAvatarURL } from "../storageHelpers";
import { useRouter } from "next/router";
import { convertAgeRange } from "../stringConverters"

interface Props {
    group: Group;
    id: string;
}

const GroupCard = ({ group, id }: Props) => {
    const router = useRouter();
    return (
        <Flex
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
            justifyContent="flex-end"
            _hover={{
                cursor: "pointer",
                boxShadow:
                    "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
            }}
            onClick={() => {
                router.push("./group/" + id);
            }}
            textColor="black"
            my="5px"
        >
            <Image
                src={getGroupAvatarURL(id)}
                maxH="200px"
                w="auto"
                marginTop="-8px"
                borderRadius="3px"
            />
            <Flex
                flexDir="column"
                borderBottom="1px solid"
                borderColor="gray"
                justifyContent="flex-end"
                px="16px"
                py="10px"
            >
                <Text textColor="gray.700">{group.description}</Text>
                <Heading>{group.name}</Heading>
            </Flex>
            <Flex
                flexDir="row"
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
                        backgroundColor="main"
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
