import React from "react";
import { useRouter } from "next/dist/client/router";

import GroupPage from "../../components/pages/GroupPage";

// Firestore stuff:
import { groups } from "../../firestoreCollections";
import { useGet } from "@typesaurus/react";
import { defaultGroup } from "../../objectDefaults";
import firebase from "../../firebase";

const Group = () => {
    // page for any kind of youth club, with their name location, contact details, members etc...
    // can be customized by the owner of the youth club
    const router = useRouter();
    const user = firebase.auth().currentUser;
    let { groupID } = router.query;
    if (typeof groupID !== "string") {
        groupID = "";
    }
    const [group, { loading, error }] = useGet(groups, groupID);

    if (loading) {
        return <div>loading</div>;
    }
    if (error || !group) {
        return <div>{JSON.stringify(error)}</div>;
    }
    return <GroupPage group={group.data} groupID={groupID} user={user} />;
};

export default Group;
