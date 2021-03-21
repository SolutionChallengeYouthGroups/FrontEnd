import { Range, MeetingTime, Day, Frequency } from "./firestoreTypes";
import { padStart, splitTime } from "./helperFunctions";

export function convertRange(range: Range): string{
    let min = range.min;
    let max = range.max;
    if (min === 0 && max === 0){
        return "Any"
    }
    let text = min + " - " + max;
    if (min === 0){
        text = "Under " + max;
    }
    if (max === 0){
        text = min + "+";
    }
    return text;
}
export function convertMeetingTime(meeting: MeetingTime): string{
    return Day[meeting.day] + " " + 
    convertTimeRange(meeting.startTime, meeting.endTime) + ", " +
    Frequency[meeting.frequency];
}
export function convertTime(time: number): string{
    const [hour, min] = splitTime(time);
    return padStart(hour, 2, "0") + ":" + padStart(min, 2, "0");
}
export function convertTimeRange(time1: number, time2: number){
    return `${convertTime(time1)} - ${convertTime(time2)}`;
}