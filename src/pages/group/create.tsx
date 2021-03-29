import React from "react";
import { useRouter } from "next/dist/client/router";

import GroupPage from "../../components/group_page/GroupPage";
import LoginRequired from "../../components/LoginRequired";

// Firestore stuff:
import { defaultGroup } from "../../objectDefaults";
import firebase from "../../firebase";

const Group = () => {
    // page for any kind of youth club, with their name location, contact details, members etc...
    // can be customized by the owner of the youth club
    const router = useRouter();
    const user = firebase.auth().currentUser;
    if (user === null || user.isAnonymous) {
        return <LoginRequired />;
    }

    return <GroupPage group={defaultGroup()} user={user} />;
};

export default Group;
