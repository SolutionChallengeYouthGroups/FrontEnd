import { Range, MeetingTime, Day, Frequency } from "./firestoreTypes";

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
    const hour = Math.trunc(time / 60);
    const min = Math.trunc(time % 60);
    return (hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min);
}
export function convertTimeRange(time1: number, time2: number){
    return `${convertTime(time1)} - ${convertTime(time2)}`;
}