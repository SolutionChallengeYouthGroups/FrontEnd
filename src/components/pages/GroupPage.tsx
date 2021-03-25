// Chakra-UI
import { VStack, Text, Image, Flex, HStack, Avatar, Input, Textarea, useToast, Button, Portal } from "@chakra-ui/react";

import { FiEdit } from "react-icons/fi";
import { FaSave } from "react-icons/fa";
import { CloseIcon } from "@chakra-ui/icons"

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
import { Group, User } from "../../firestoreTypes";

import { MouseEvent, useEffect, useState } from "react"

import firebase from "../../firebase"
import { add, update, ref, Ref } from "typesaurus";
import { groups, users } from "../../firestoreCollections";
import _ from "lodash";
import { useRouter } from "next/router";

import { useContext } from "react"
import { UserContext } from "../../lib/context"
import TopNav from "../TopNav";

interface Props{
    group: Group;
    groupID?: string;
}

function writeData(group: Group, user: Ref<User>, groupID?: string){
    if (!!groupID){
      return update(groups, groupID, group);
    }
    group.createdAt = firebase.firestore.Timestamp.now();
    group.owners = [user]
    return add(groups, group);
}
let lastGroup: Group;
const GroupPage = (props: Props) => {
  const { user, username, email } = useContext(UserContext);
  const userany = user as any;
  const uref = ref(users, userany?.uid);
  const router = useRouter();
  const toast = useToast();
  const [group, setGroup] = useState(_.cloneDeep(props.group));
  const [edit, setEdit] = useState(false);

    function saveClick(e: MouseEvent<HTMLButtonElement>){
        (e.target as Element).setAttribute("isLoading", "true");
        writeData(group, uref, props.groupID).then((groupref?: (Ref<Group> | void)) => {
            if (!props.groupID){
              router.push("/group/"+(groupref as Ref<Group>).id);
              return;
            }
            toast.closeAll();
            toast({
                title: "Group saved",
                status: "success",
                duration: 2000,
                isClosable: true
            });
            lastGroup = _.cloneDeep(group);
            setEdit(false);
        }, () => (e.target as Element).setAttribute("isLoading", "false"));
    }
    function cancelClick(){
        if (!props.groupID){
          router.push("/");
        }
        setGroup(lastGroup === undefined ? {...props.group} : _.cloneDeep(lastGroup));
        toast.closeAll();
        setEdit(false);
    }
    
    const setEditHandler = () => {
        toast({
            position: "bottom-right",
            duration: null,
            render: () => <Flex flexDir="row" justifyContent="space-around" 
            backgroundColor="mainLight" boxShadow="-3px -3px 10px 0px rgba(0, 0, 0, 0.6)">
                <Button size="sm" margin="10px 0px" colorScheme="green"
                leftIcon={<FaSave/>} borderRadius="0px" onClick={saveClick}>Save</Button>
                <Button size="sm" margin="10px 0px" colorScheme="red" 
                leftIcon={<CloseIcon/>} borderRadius="0px"
                onClick={cancelClick}>Cancel</Button>
        </Flex>
        });
        setEdit(true);
    }
    const icon = FiEdit({color: "white", size: "30px"});
    if ((userany === null || userany.isAnonymous) && !props.groupID){
      router.push("/");
      return null;
    }
    useEffect(() => {
      if (!props.groupID){
        setEditHandler();
      }
    }, []);
    return (
      <VStack
      height="100vh"
      align="center"
      justifyContent="flex-start"
      >
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
            <Avatar src={!props.groupID ? "" : getGroupAvatarURL(props.groupID)} 
            width="100px" height="100px" margin="20px"/>
            <VStack flex="1 1 0" minWidth="0">
              <GroupNameInput group={group} edit={edit}/>
              <HStack alignItems="center" justifyContent="space-evenly" width="100%">
                <GroupCategoryDisplay group={group} edit={edit}/>
                <AgeRangeDisplay group={group} edit={edit}/>
                <MeetingTimeDisplay group={group} edit={edit}/>
              </HStack>
            </VStack>
            <SocialGrid group={group} edit={edit}/>
    
          </Flex>
        </Portal>
        <Portal>
          <TopNav/>
        </Portal>
        {props.group.owners.some(owner => owner.id === uref.id) ? 
        <Portal><FloatingButton icon={icon} bg="main" aria-label="edit" 
        _hover={{backgroundColor: "mainLight"}} onClick={setEditHandler} display={edit ? "none" : "flex"}/></Portal> : <></>}
        <Head>
          <title>{props.group.name}</title>
        </Head>
        <Flex
          flexDir="column"
          justifyContent="start"
          alignItems="center"
          w="100%"
          flex="auto"
          padding="80px 0 0 0">    
            <HStack
              wrap="wrap"
              w="90%"
              margin="15px"
              alignItems="normal"
              justifyContent="space-between"
              flex="auto"
              padding="150px 0 0 0"
            >
              <Flex flexDir="column" alignItems="normal" w="40%" h="auto" padding="0 0 7px 5px"
              border="2px solid" borderColor="mainLight" borderRadius="8px">
                <Text fontSize="1.5em" fontWeight="bold">Group Description:</Text>
                <GroupDescInput group={group} edit={edit}/>
              </Flex>
            </HStack>
          </Flex>
        </VStack>
    );
}

export default GroupPage;