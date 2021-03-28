import React, { HTMLProps, useState } from "react";
import { MeetingTime, Day, Frequency, Group } from "../../firestoreTypes";
import { FaUserClock } from "react-icons/fa";
import TextWithIcon from "../TextWithIcon";
import { convertMeetingTime, convertTimeRange } from "../../stringConverters";
import { meetingTimeDefault } from "../../objectDefaults";
import styles from "../componentStyles.module.css";
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
    Popover,
    PopoverTrigger,
    PopoverHeader,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
    PopoverContent,
    IconButton,
    HStack,
    Link,
    BoxProps,
    Box,
    LinkBox,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import EditableMeetingTime from "./EditableMeetingTime";

interface Props extends BoxProps {
    group: Group;
    edit?: boolean;
}

const MeetingTimeDisplay = ({ group, edit, ...rest }: Props) => {
    const [newtimes, setNewTimesState] = useState(group.meetingTimes);
    const { isOpen, onOpen, onClose } = useDisclosure(); // for modal

    function setTimes(times: MeetingTime[]) {
        group.meetingTimes = times;
        setNewTimesState(times);
    }

    if (edit === true) {
        return (
            <Popover placement="bottom">
                <PopoverTrigger>
                    <Link className={styles.underlineLinkHover}>
                        <Box {...rest}>
                            <TextWithIcon
                                className={styles.greytext}
                                icon={FaUserClock}
                                text="Edit Meeting Times"
                                title="Meeting Times"
                            />
                        </Box>
                    </Link>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverHeader>
                        <HStack>
                            <Text fontWeight="semibold">Meeting Times</Text>
                            <IconButton
                                icon={<AddIcon />}
                                colorScheme="green"
                                aria-label="add meeting time"
                                size="sm"
                                onClick={(e) => {
                                    setTimes([
                                        ...group.meetingTimes,
                                        meetingTimeDefault(),
                                    ]);
                                }}
                            />
                        </HStack>
                    </PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                        {group.meetingTimes.length === 0 ? (
                            <Text>No meeting times have been created</Text>
                        ) : (
                            <VStack>
                                {group.meetingTimes.map((mt, i) => (
                                    <EditableMeetingTime
                                        key={mt.name + "\t" + i}
                                        meetingTimes={group.meetingTimes} // \t is to help ensure uniqueness
                                        index={i}
                                        meetingTimesChangedCallback={(ts) =>
                                            setTimes(ts)
                                        }
                                    />
                                ))}
                            </VStack>
                        )}
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        );
    }
    if (group.meetingTimes.length === 0) {
        return (
            <Box {...rest}>
                <TextWithIcon
                    title="Meeting Time"
                    className={styles.greytext}
                    text="No meeting times"
                    icon={FaUserClock}
                />
            </Box>
        );
    }
    if (group.meetingTimes.length === 1) {
        return (
            <Box {...rest}>
                <TextWithIcon
                    title="Meeting Time"
                    className={styles.greytext}
                    text={convertMeetingTime(group.meetingTimes[0])}
                    icon={FaUserClock}
                />
            </Box>
        );
    }
    const sorted: MeetingTime[][] = Array(7)
        .fill(0)
        .map((x) => Array());
    group.meetingTimes.forEach((meeting) => {
        let index = 0;
        let dayTimes = sorted[meeting.day];
        for (; index < dayTimes.length; index++) {
            if (meeting.startTime < dayTimes[index].startTime) {
                break;
            }
        }
        dayTimes.splice(index, 0, meeting);
    }); // efficiently sorts the MeetingTimes into bins by day, and then by start time

    return (
        <Box {...rest}>
            <a
                className={styles.greytext + " " + styles.underlineLinkHover}
                onClick={onOpen}
            >
                <TextWithIcon
                    _hover={{ cursor: "pointer" }}
                    icon={FaUserClock}
                    text="Multiple Meeting Times"
                    title="Meeting Times"
                />
            </a>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                scrollBehavior="inside"
                size="lg"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        alignSelf="center"
                        style={{ textDecoration: "underline" }}
                    >
                        Meeting Times
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack alignItems="normal">
                            {sorted.map((dayTimes, index) =>
                                dayTimes.length === 0 ? (
                                    <React.Fragment key={index} />
                                ) : (
                                    <VStack key={index} alignItems="normal">
                                        <Text fontWeight="bold">
                                            {Day[index]}:
                                        </Text>
                                        <UnorderedList paddingLeft="30px">
                                            {dayTimes.map((meetingTime, i) => (
                                                <li
                                                    key={
                                                        meetingTime.name +
                                                        "\t" +
                                                        i
                                                    }
                                                >
                                                    <VStack
                                                        alignItems="normal"
                                                        spacing="0"
                                                    >
                                                        <Text>
                                                            {meetingTime.name}
                                                        </Text>
                                                        <Text paddingLeft="10px">
                                                            {convertTimeRange(
                                                                meetingTime.startTime,
                                                                meetingTime.endTime
                                                            ) +
                                                                ", " +
                                                                Frequency[
                                                                    meetingTime
                                                                        .frequency
                                                                ]}
                                                        </Text>
                                                    </VStack>
                                                </li>
                                            ))}
                                        </UnorderedList>
                                    </VStack>
                                )
                            )}
                        </VStack>
                    </ModalBody>
                    <ModalFooter />
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default MeetingTimeDisplay;
