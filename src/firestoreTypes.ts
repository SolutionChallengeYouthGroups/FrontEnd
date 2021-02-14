// firestore data types
import {
  DocumentReference,
  CollectionReference,
  GeoPoint,
  Timestamp,
} from "@firebase/firestore-types";
import { Ref } from "typesaurus";

interface User {
  id: string;
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  groups: Ref<Group>[]; // reference to Group
  createdAt: Timestamp;
  // profile picture is the userId
}

type GroupCategory = "scouting" | "physical" | "educational" | "social" | "artistic" | "board games" |
                  "esports" | "faith-based" | "political" | "";

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

interface Range{
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
