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

type GroupTypes = "scouts" | "sports" | "religious" | "other";

interface Group {
  // name is the id of the group
  name: string;
  location?: GeoPoint;
  description: string;
  type: GroupTypes;
  owner: Ref<User>; // reference to the onwer of the group
  chat: CollectionReference; // reference to a chat which contains ChatMessages
  announcements: Ref<Post>[]; // array of announcements which are posts
  createdAt: Timestamp;
  members: Ref<User>[];
  // implement meeting times not sure how
  // group picture is the id
}
interface ChatMessage {
  author: Ref<User>; // reference to author
  createdAt: Timestamp;
  content: string;
  // not sure how to do media yet
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

export type { Group, User, GroupTypes, Post, ChatMessage, Comment };
