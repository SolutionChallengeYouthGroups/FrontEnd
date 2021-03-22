import { Flex, HStack, IconButton, Input, Select, StackProps, Text, VStack } from "@chakra-ui/react";
import { MeetingTime, Day, Frequency } from "../../firestoreTypes";
import { padStart, splitTime, enumKeys,  } from "../../helperFunctions";
import { DeleteIcon } from "@chakra-ui/icons"
import _ from "lodash"
import { useState } from "react";


interface Props extends StackProps {
    meetingTimes: MeetingTime[];
    index: number;
    meetingTimesChangedCallback?: (times: MeetingTime[]) => void;
}

const EditableMeetingTime = ({meetingTimes, index, meetingTimesChangedCallback, ...rest}: Props) => {
    const [meetingTime, setMeetingTime] = useState(meetingTimes[index]);
    if (meetingTimes[index] !== meetingTime){
        setMeetingTime(meetingTimes[index]);
    }
    function setMeetingProperty(props: Partial<MeetingTime>){
        const newTime = {...meetingTime, ...props};
        setMeetingTime(newTime);
        meetingTimes[index] = newTime;
    }
    function deleteTime(){
        if (meetingTimesChangedCallback === undefined){
            throw new TypeError("A callback must be defined for deletion");
        }
        meetingTimesChangedCallback([...meetingTimes.slice(0, index), ...meetingTimes.slice(index+1)]);
    }
    return <VStack {...rest} alignItems="start" border="1px solid" borderRadius="5px" padding="5px" >
        <Flex flexDirection="row" width="100%">
            <Input flex="auto" value={meetingTime.name} placeholder="Meeting name"
            size="xs" margin="0px 5px 0px 0px" onChange={(e) => setMeetingProperty({
                name: e.target.value
            })}/>
            <IconButton icon={<DeleteIcon/>} colorScheme="red" aria-label="Delete meeting time" size="xs"
            onClick={(e) => deleteTime()}/>
        </Flex>
        <HStack width="100%">
            <Select value={meetingTime.day} size="xs" onChange={(e) => setMeetingProperty({
                day: Number.parseInt(e.target.value)
            })}>
                {_.range(0, 7).map(
                    d => <option value={d} key={d}>{Day[d]}</option>
                )}
            </Select>
            <Text>,</Text>
            <Select value={meetingTime.frequency} size="xs" onChange={(e) => setMeetingProperty({
                frequency: Number.parseInt(e.target.value)
            })}>
                {enumKeys(Frequency).map(
                    f => <option value={f} key={f}>{Frequency[f]}</option>
                )}
            </Select>
        </HStack>
        <HStack width="100%">
            <Select value={splitTime(meetingTime.startTime)[0]}
            size="xs" variant="flushed" onChange={(e) => setMeetingProperty({
                startTime: Number.parseInt(e.target.value)*60+splitTime(meetingTime.startTime)[1]
            })}>
                {_.range(0, 24).map(
                    h => <option value={h} key={h}>{padStart(h, 2, "0")}</option>
                )}
            </Select>
            <Text>:</Text>
            <Select value={splitTime(meetingTime.startTime)[1]}
            size="xs" variant="flushed" onChange={(e) => setMeetingProperty({
                startTime: splitTime(meetingTime.startTime)[0]*60+Number.parseInt(e.target.value)
            })}>
                {_.range(0, 60).map(
                    m => <option value={m} key={m}>{padStart(m, 2, "0")}</option>
                )}
            </Select>
            <Text>-</Text>
            <Select value={splitTime(meetingTime.endTime)[0]}
            size="xs" variant="flushed" onChange={(e) => setMeetingProperty({
                endTime: Number.parseInt(e.target.value)*60+splitTime(meetingTime.endTime)[1]
            })}>
                {_.range(0, 24).map(
                    h => <option value={h} key={h}>{padStart(h, 2, "0")}</option>
                )}
            </Select>
            <Text>:</Text>
            <Select value={splitTime(meetingTime.endTime)[1]}
            size="xs" variant="flushed" onChange={(e) => setMeetingProperty({
                endTime: splitTime(meetingTime.endTime)[0]*60+Number.parseInt(e.target.value)
            })}>
                {_.range(0, 60).map(
                    m => <option value={m} key={m}>{padStart(m, 2, "0")}</option>
                )}
            </Select>
        </HStack>
    </VStack>
}

export default EditableMeetingTime;