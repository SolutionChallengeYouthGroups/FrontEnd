import { collection } from "typesaurus";
import { Post, User, Group, Comment } from "./firestoreTypes";

const comments = collection<Comment>("comments");
const posts = collection<Post>("posts");
const groups = collection<Group>("groups");
const users = collection<User>("users");

export { comments, posts, groups, users };
