import { Day, Frequency, Group, MeetingTime, SocialLinks, Range } from "./firestoreTypes";
import  firebase from "./firebase"

export function meetingTimeDefault(): MeetingTime{
    return {
        name: "Meeting Name",
        startTime: 0,
        endTime: 1439, // 23:59
        frequency: Frequency.weekly,
        day: Day.Monday
    }
}

export function defaultSocialLinks(): SocialLinks{
    return {
        twitter: "",
        facebook: "",
        instagram: "",
        email: "",
        website: "",
        phone: "",
        whatsapp: ""
    }
}

export function defaultRange(): Range{
    return {
        min: 0,
        max: 0
    }
}

export function defaultGroup(): Group{
    return {
        name: "New Group",
        description: "Group Description...",
        category: "",
        owners: [],
        createdAt: firebase.firestore.Timestamp.now(),
        links: defaultSocialLinks(),
        ageRange: defaultRange(),
        meetingTimes: []
    }
}