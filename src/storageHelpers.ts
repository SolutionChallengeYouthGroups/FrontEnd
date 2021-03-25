import { storage } from "./firebase";

export function storagePathToURL(path: string, args: string): string {
    return (
        "https://firebasestorage.googleapis.com/v0/b/soltuionchallenge.appspot.com/o/" +
        encodeURIComponent(path) +
        "?" +
        args
    );
}
export function getGroupAvatarURL(groupID: string){
    return storagePathToURL("groups/" + groupID + "/profile.png", "alt=media");
}
