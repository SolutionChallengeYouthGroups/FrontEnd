import React from "react";
import { MeetingTime } from "../firestoreTypes";
import { FaUserClock } from "react-icons/fa"
import TextWithIcon from "./TextWithIcon";
import { convertMeetingTime } from "../stringConverters";
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
  } from "@chakra-ui/react"

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
        return <TextWithIcon title="Meeting Times" classname={styles.greytext}
                text={convertMeetingTime(meeting)}
                icon={FaUserClock}/>;
    }
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (<><a className={styles.underlineLinkHover} onClick={onOpen}>
        <TextWithIcon classname={styles.greytext} icon={FaUserClock} text="Multiple Meeting Times"/>

        </a>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Meeting Times</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    CONTENT
                </ModalBody>
                <ModalFooter/>
            </ModalContent>
        </Modal>
        </>);
};

export default MeetingTimeDisplay;
