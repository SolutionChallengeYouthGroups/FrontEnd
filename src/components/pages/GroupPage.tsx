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
    useToast,
    Button,
    Portal,
    Box,
} from "@chakra-ui/react";

import { FiEdit } from "react-icons/fi";
import { FaSave } from "react-icons/fa";
import { CloseIcon } from "@chakra-ui/icons";

import { getGroupAvatarURL } from "../../storageHelpers";

// Custom Components:
import AgeRangeDisplay from "../groupComponents/AgeRangeDisplay";
import Head from "next/head";
import SocialGrid from "../../components/groupComponents/SocialGrid";
import MeetingTimeDisplay from "../../components/groupComponents/MeetingTimeDisplay";
import GroupCategoryDisplay from "../../components/groupComponents/GroupCategoryDisplay";
import FloatingButton from "../../components/groupComponents/FloatingButton";
import GroupNameInput from "../../components/groupComponents/GroupNameInput";
import GroupDescInput from "../../components/groupComponents/GroupDescInput";
import GroupLocation from "../groupComponents/GroupLocation";
import { GeoPointLocation, Group, User } from "../../firestoreTypes";

import React, { MouseEvent, useEffect, useState } from "react";

import firebase from "../../firebase";
import { add, update, ref, Ref } from "typesaurus";
import { groups, users } from "../../firestoreCollections";
import _ from "lodash";
import { useRouter } from "next/router";


interface Props {
    group: Group;
    user: firebase.User | null;
    groupID?: string;
}

let lastGroup: Group;
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
    function success() {
        toast.closeAll();
        toast({
            title: "Group saved",
            status: "success",
            duration: 2000,
            isClosable: true,
        });
        lastGroup = _.cloneDeep(group);
        setEdit(false);
    }
    function failure(element: Element) {
        element.setAttribute("isLoading", "false");
        toast({
            title: "Error saving Group",
            status: "error",
            duration: 2000,
            isClosable: true,
        });
    }
    function saveClick(e: MouseEvent<HTMLButtonElement>) {
        (e.target as Element).setAttribute("isLoading", "true");
        if (!!props.groupID) {
            update(groups, props.groupID, group).then(
                () => success(),
                (error) => failure(e.target as Element)
            );
            return;
        }
        group.createdAt = firebase.firestore.Timestamp.now();
        group.owners = [uref as Ref<User>];
        add(groups, group).then(
            (groupref) => {
                toast.closeAll();
                router.push("/group/" + groupref.id);
            },
            (error) => failure(e.target as Element)
        );
    }
    function cancelClick() {
        if (!props.groupID) {
            router.push("/");
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
        toast({
            position: "bottom",
            duration: null,
            render: () => (
                <Flex
                    flexDir="row"
                    justifyContent="space-around"
                    backgroundColor="mainLight"
                    boxShadow="0px 10px 10px 2px rgba(0, 0, 0, 0.6)"
                >
                    <Button
                        size="sm"
                        margin="10px 0px"
                        colorScheme="green"
                        leftIcon={<FaSave />}
                        borderRadius="0px"
                        onClick={saveClick}
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
            ),
        });
        setEdit(true);
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
                    padding="80px 0 0 0"
                    background="white"
                >
                    {/* Top bar with basic information */}
                    <Avatar
                        src={
                            !props.groupID
                                ? ""
                                : getGroupAvatarURL(props.groupID)
                        }
                        width="100px"
                        height="100px"
                        margin="20px"
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
            <Flex
                flexDir="column"
                justifyContent="start"
                alignItems="center"
                w="100%"
                flex="auto"
                padding="80px 0 0 0"
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
