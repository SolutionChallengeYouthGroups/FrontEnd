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
  createdAt: Timestamp;
  owners: Ref<User>[];
  links: Links;
  // implement meeting times not sure how
  // group picture is the id
}

interface Links{
  email: string;
  facebook: string;
  instagram: string;
  phone: string;
  twitter: string;
  website: string;
  whatsapp: string;
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

export type { Group, User, GroupTypes, Links, Post, Comment };
