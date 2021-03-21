// firestore data types
import {
  DocumentReference,
  CollectionReference,
  GeoPoint,
  Timestamp,
} from "@firebase/firestore-types";
import { Ref } from "typesaurus";

interface User {
  name: string;
  username: string;
  email: string;
  groups: Ref<Group>[]; // reference to Groups this user is part of
  createdAt: Timestamp;
  phoneNumber?:string; // optional phone number, probz just for adults
  // profile picture is the userId
}

type GroupCategory = "scouting" | "physical" | "educational" | "social" | "artistic" | "board games" |
                  "gaming" | "faith-based" | "political" | "";
export const GroupCategories = ["scouting", "physical", "educational", "social", "artistic", "board games",
"gaming", "faith-based", "political", ""]; // create a list for looping

interface Group {
  // the ID is not the same as the name to avoid checking duplicates
  name: string;
  location?: GeoPoint;
  description: string;
  category: GroupCategory;
  createdAt: Timestamp;
  owners: Ref<User>[];
  links: SocialLinks;
  ageRange: Range;
  meetingTimes: MeetingTime[];
  // group picture is the id
}

interface Range{ // for ages, zero is a signifier for a missing value
  min: number;
  max: number;
}

interface SocialLinks{
  email: string;
  facebook: string;
  instagram: string;
  phone: string;
  twitter: string;
  website: string;
  whatsapp: string;
}

export enum Day{ // the entries are ordered
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday
};

interface MeetingTime{
  name: string,
  day: Day,
  startTime: number, // minutes past midnight
  endTime: number,   // minutes past midnight as well
  frequency: Frequency
}

export enum Frequency{ // the entries are ordered
  weekly,
  fortnightly,
  monthly
}

interface Post {
  title: string;
  author: Ref<User>;
  createdAt: Timestamp;
  content: string;
  comments: CollectionReference;
}
interface Comment {
  author: Ref<User>; // reference to author
  createdAt: Timestamp;
  content: string;
}

export type { Group, User, GroupCategory, SocialLinks , Range, MeetingTime, Post, Comment };
