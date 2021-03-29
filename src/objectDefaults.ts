import {
    Day,
    Frequency,
    Group,
    MeetingTime,
    SocialLinks,
    Range,
    GeoPointLocation,
} from "./firestoreTypes";
import firebase from "./firebase";

export function meetingTimeDefault(): MeetingTime {
    return {
        name: "Meeting Name",
        startTime: 0,
        endTime: 1439, // 23:59
        frequency: Frequency.weekly,
        day: Day.Monday,
    };
}

export function defaultSocialLinks(): SocialLinks {
    return {
        twitter: "",
        facebook: "",
        instagram: "",
        email: "",
        website: "",
        phone: "",
        whatsapp: "",
    };
}

export function defaultRange(): Range {
    return {
        min: 0,
        max: 0,
    };
}

export function defaultGroup(): Group {
    return {
        name: "New Group",
        description: "",
        category: "other",
        owners: [],
        createdAt: firebase.firestore.Timestamp.now(),
        links: defaultSocialLinks(),
        ageRange: defaultRange(),
        meetingTimes: [],
    };
}
export function defaultGeoPointLocation(): GeoPointLocation {
    return new GeoPointLocation(52.383599, -1.56006);
}

export const defaultGroupImage: string =
    "https://firebasestorage.googleapis.com/v0/b/glink-28cd3.appspot.com/o/groups%2Fdefaults%2FgroupDefault.png?alt=media";
