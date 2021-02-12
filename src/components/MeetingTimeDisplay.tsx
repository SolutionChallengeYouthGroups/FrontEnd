import React from "react";
import { MeetingTime, Day, Frequency } from "../firestoreTypes";
import { FaUserClock } from "react-icons/fa"
import TextWithIcon from "./TextWithIcon";
import { convertMeetingTime, convertTimeRange } from "../stringConverters";
import styles from "./componentStyles.module.css";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    VStack,
    Text,
    UnorderedList,
    ListItem
  } from "@chakra-ui/react";

interface Props {
  meetingTimes?: MeetingTime[]; // Use for multiple times (has priority)
  meetingTime?: MeetingTime; // Use for a single time
}

const MeetingTimeDisplay = (props: Props) => {
    if (props.meetingTimes === undefined || props.meetingTimes.length <= 1){
        let meeting;
        if (props.meetingTimes === undefined || props.meetingTimes.length === 0){
            if (props.meetingTime === undefined){
                return <></>;
            }
            meeting = props.meetingTime;
        }
        else{
            meeting = props.meetingTimes[0];
        }
        return <TextWithIcon title="Meeting Time" classname={styles.greytext}
                text={convertMeetingTime(meeting)}
                icon={FaUserClock}/>;
    }
    const { isOpen, onOpen, onClose } = useDisclosure();
    const sorted: MeetingTime[][] = Array(7).fill(0).map(x => Array());
    props.meetingTimes.forEach(meeting => {
        let index = 0;
        let dayTimes = sorted[meeting.day];
        for (; index < dayTimes.length; index++){
            if (meeting.startTime < dayTimes[index].startTime){
                break;
            }
        }
        dayTimes.splice(index, 0, meeting);
    }); // efficiently sorts the MeetingTimes into bins by day, and then by start time

    return (<><a className={styles.underlineLinkHover} onClick={onOpen}>
        <TextWithIcon classname={styles.greytext} icon={FaUserClock} text="Multiple Meeting Times" title="Meeting Times"/>

        </a>
        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="lg">
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader alignSelf="center" style={{textDecoration: "underline"}}>Meeting Times</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <VStack alignItems="normal">
                        {sorted.map((dayTimes, index) => 
                            dayTimes.length === 0 ? <></> : 
                            <VStack alignItems="normal">
                                <Text fontWeight="bold">{Day[index]}:</Text>
                                <UnorderedList paddingLeft="30px">
                                    {dayTimes.map((meetingTime, i) => 
                                        // key attribute is not working, need to fix
                                        <ListItem>
                                        <VStack alignItems="normal" spacing="0">
                                            <Text>{meetingTime.name}</Text>
                                            <Text paddingLeft="10px">{
                                            convertTimeRange(meetingTime.startTime, meetingTime.endTime) +
                                            ", " + Frequency[meetingTime.frequency]}</Text>
                                        </VStack>
                                        </ListItem>)}
                                </UnorderedList>
                            </VStack>
                        )}
                    </VStack>
                </ModalBody>
                <ModalFooter/>
            </ModalContent>
        </Modal>
        </>);
};

export default MeetingTimeDisplay;
