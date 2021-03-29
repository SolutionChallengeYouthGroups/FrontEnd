import { Ref, ref } from "typesaurus";
import { auth, storage } from "./firebase";
import firebase from "./firebase";
import { users } from "./firestoreCollections";
import { User } from "./firestoreTypes";
import { defaultGroupImage } from "./objectDefaults";
export function storagePathToURL(path: string, args: string): string {
    return (
        "https://firebasestorage.googleapis.com/v0/b/glink-28cd3.appspot.com/o/" +
        encodeURIComponent(path) +
        "?" +
        args
    );
}
export async function getGroupAvatarURL(groupID: string): Promise<string> {
    try {
        // try to get the image:
        let downloadURL = await storage
            .ref(`groups/${groupID}/profile.png`)
            .getDownloadURL();
        return downloadURL;
    } catch (error) {
        // return the default group icon if the image is not found
        return defaultGroupImage;
    }
}
export function setGroupAvatar(
    file: Blob,
    groupID: string
): firebase.storage.UploadTask {
    return firebase
        .storage()
        .ref("/groups/" + groupID + "/profile.png")
        .put(file);
}

export function uploadPost(file: File, postID: string) {
    let ref = firebase.storage().ref(`/posts/${postID}/${file.name}`);
    return ref.put(file, { contentType: file.type });
}
export function uploadGroupImage(file: File, groupID: string) {
    let ref = firebase.storage().ref(`/groups/${groupID}/profile.png`);
    return ref.put(file);
}

export function getCurrentUserRef(): Ref<User> | undefined {
    let user = firebase.auth().currentUser;
    if (user) {
        return ref(users, user.uid);
    }
}

export function timestampToDate(
    oldTimestamp: firebase.firestore.Timestamp
): Date {
    return new firebase.firestore.Timestamp(
        oldTimestamp.seconds,
        oldTimestamp.nanoseconds
    ).toDate();
}
