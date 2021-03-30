// Chakra-UI
import {
    VStack,
    Text,
    Image,
    Flex,
    HStack,
    Avatar,
    Input,
    Textarea,
    Button,
    Portal,
    Box,
    useToast,
    LinkBox,
    Icon,
} from "@chakra-ui/react";

import { FiEdit } from "react-icons/fi";
import { FaSave } from "react-icons/fa";
import { CloseIcon, TriangleDownIcon } from "@chakra-ui/icons";

import { getGroupAvatarURL } from "../../storageHelpers";

// Custom Components:
import AgeRangeDisplay from "../groupComponents/AgeRangeDisplay";
import Head from "next/head";
import SocialGrid from "../groupComponents/SocialGrid";
import MeetingTimeDisplay from "../groupComponents/MeetingTimeDisplay";
import GroupCategoryDisplay from "../groupComponents/GroupCategoryDisplay";
import FloatingButton from "../groupComponents/FloatingButton";
import GroupNameInput from "../groupComponents/GroupNameInput";
import GroupDescInput from "../groupComponents/GroupDescInput";
import GroupLocation from "../groupComponents/GroupLocation";
import { GeoPointLocation, Group, User } from "../../firestoreTypes";

import React, { MouseEvent, useEffect, useState } from "react";

import firebase from "../../firebase";
import { add, update, ref, Ref } from "typesaurus";
import { groups, users } from "../../firestoreCollections";
import _ from "lodash";
import { useRouter } from "next/router";

import GroupAvatar from "../groupComponents/GroupAvatar";

interface Props {
    group: Group;
    user: firebase.User | null;
    groupID?: string;
}

let lastGroup: Group;
let avatarSaveRef: [(groupID: string, newGroup: boolean) => Promise<void>] = [
    async (groupID: string, newGroup: boolean) => {},
];
const GroupPage = (props: Props) => {
    const user = props.user;
    let uref: null | Ref<User> = null;
    if (user !== null) {
        uref = ref(users, user?.uid);
    }
    const router = useRouter();
    const toast = useToast();
    const [group, setGroup] = useState(_.cloneDeep(props.group));
    const [edit, setEdit] = useState(false);
    const [editOptionsOpen, setEditOptionsOpen] = useState(true);
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    function success() {
        toast.closeAll();
        toast({
            title: "Group saved",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "bottom-left",
        });
        lastGroup = _.cloneDeep(group);
    }
    function failure() {
        toast({
            title: "Error saving Group",
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "bottom-left",
        });
        setIsButtonLoading(false);
    }
    function saveClick(e: MouseEvent<HTMLButtonElement>) {
        setIsButtonLoading(true);
        if (!!props.groupID) {
            update(groups, props.groupID, group).then(
                () => {
                    success();
                    avatarSaveRef[0](props.groupID || "", true); // to make TS happy but the check is done above
                    setEdit(false);
                    setIsButtonLoading(false);
                },
                (error) => failure()
            );
            return;
        }
        group.createdAt = firebase.firestore.Timestamp.now();
        group.owners = [uref as Ref<User>];
        add(groups, group).then(
            async (groupref) => {
                await avatarSaveRef[0](groupref.id, false);
                router.push("/group/" + groupref.id);
            },
            (error) => failure()
        );
    }
    function cancelClick() {
        if (!props.groupID) {
            router.push("/");
            return;
        }
        setGroup(
            lastGroup === undefined
                ? { ...props.group }
                : _.cloneDeep(lastGroup)
        );
        toast.closeAll();
        setEdit(false);
    }

    const setEditHandler = () => {
        setEdit(true);
        setEditOptionsOpen(true);
    };
    const icon = FiEdit({ color: "white", size: "30px" });
    useEffect(() => {
        if (!props.groupID) {
            setEditHandler();
        }
    }, []);
    const beforeChanges = lastGroup || props.group;
    return (
        <VStack flexGrow={2} align="center" justifyContent="flex-start">
            <Portal>
                <Flex
                    w="100%"
                    alignItems="center"
                    boxShadow="0 10px 5px -5px rgba(0, 0, 0, 0.2)"
                    borderRadius="30px"
                    justifyContent="normal"
                    position="fixed"
                    top="0px"
                    padding="62px 0 0 0"
                    background="white"
                >
                    {/* Top bar with basic information */}
                    <GroupAvatar
                        groupID={props.groupID}
                        editable={edit}
                        onSaveRef={avatarSaveRef}
                    />
                    <VStack flex="1 1 0" minWidth="0">
                        <GroupNameInput group={group} edit={edit} />
                        <HStack
                            alignItems="center"
                            justifyContent="space-evenly"
                            width="100%"
                        >
                            <GroupCategoryDisplay group={group} edit={edit} />
                            <AgeRangeDisplay group={group} edit={edit} />
                            <MeetingTimeDisplay group={group} edit={edit} />
                        </HStack>
                    </VStack>
                    <SocialGrid group={group} edit={edit} />
                </Flex>
            </Portal>
            {props.group.owners.some((owner) => owner.id === uref?.id) ? (
                <Portal>
                    <FloatingButton
                        icon={icon}
                        bg="main"
                        aria-label="edit"
                        _hover={{ backgroundColor: "mainLight" }}
                        onClick={setEditHandler}
                        display={edit ? "none" : "flex"}
                    />
                </Portal>
            ) : (
                <></>
            )}
            <Head>
                <title>{props.group.name}</title>
            </Head>
            <Portal>
                <VStack
                    w="300px"
                    zIndex={5}
                    position="fixed"
                    bottom="0px"
                    left="50%"
                    transform={
                        "translate(-50%, " +
                        (editOptionsOpen ? "0" : "52px") +
                        ");"
                    }
                    transitionProperty="transform"
                    transitionDuration="0.2s"
                    spacing="0px"
                    display={edit ? "flex" : "none"}
                >
                    <LinkBox
                        boxShadow="0px 10px 10px 2px rgba(0, 0, 0, 0.6)"
                        borderRadius="5px 5px 0 0"
                        borderBottom="1px solid black"
                        position="relative"
                        bg="mainLight"
                        _hover={{ bg: "main", cursor: "pointer" }}
                        w="200px"
                        padding="2px"
                        transitionDuration="0.2s"
                        transitionProperty="background-color"
                        onClick={(e) => setEditOptionsOpen(!editOptionsOpen)}
                    >
                        <Flex
                            flexDirection="row"
                            justifyContent="space-around"
                            alignItems="center"
                        >
                            <Text flex="auto" textAlign="center">
                                Edit Mode
                            </Text>
                            <Icon
                                as={TriangleDownIcon}
                                height="100%"
                                color="mainDark"
                                transform={
                                    "rotate(" +
                                    (editOptionsOpen ? "0" : "180") +
                                    "deg);"
                                }
                                marginRight="6px"
                                transitionProperty="transform"
                                transitionDuration="0.2s"
                            />
                        </Flex>
                    </LinkBox>
                    <Flex
                        boxShadow="0px 10px 10px 2px rgba(0, 0, 0, 0.6)"
                        flexDir="row"
                        justifyContent="space-around"
                        width="300px"
                        bg="mainLight"
                        position="relative"
                    >
                        <Button
                            size="sm"
                            margin="10px 0px"
                            colorScheme="green"
                            leftIcon={<FaSave />}
                            borderRadius="0px"
                            onClick={saveClick}
                            isLoading={isButtonLoading}
                        >
                            Save
                        </Button>
                        <Button
                            size="sm"
                            margin="10px 0px"
                            colorScheme="red"
                            leftIcon={<CloseIcon />}
                            borderRadius="0px"
                            onClick={cancelClick}
                        >
                            Cancel
                        </Button>
                    </Flex>
                </VStack>
            </Portal>
            <Flex
                flexDir="column"
                justifyContent="start"
                alignItems="center"
                w="100%"
                flex="auto"
            >
                <HStack
                    wrap="wrap"
                    w="90%"
                    margin="15px"
                    alignItems="normal"
                    justifyContent="space-between"
                    flex="auto"
                    padding="150px 0 0 0"
                >
                    <Flex
                        flexDir="column"
                        alignItems="normal"
                        w="40%"
                        h="auto"
                        padding="0 0 7px 5px"
                        border="2px solid"
                        borderColor="main"
                        borderRadius="8px"
                    >
                        <Text fontSize="1.5em" fontWeight="bold">
                            Group Description:
                        </Text>
                        <GroupDescInput group={group} edit={edit} />
                    </Flex>
                    <Box w="40%">
                        <GroupLocation
                            group={group}
                            edit={edit}
                            originalLocation={
                                beforeChanges.location
                                    ? GeoPointLocation.fromGeoPoint(
                                          beforeChanges.location
                                      )
                                    : null
                            }
                        />
                    </Box>
                </HStack>
            </Flex>
        </VStack>
    );
};

export default GroupPage;
