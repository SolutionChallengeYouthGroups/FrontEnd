import React, { useEffect } from "react";
import { useRouter } from "next/dist/client/router";

import GroupPage from "../../components/pages/GroupPage";
import LoginRequired from "../../components/LoginRequired";

// Firestore stuff:
import { groups } from "../../firestoreCollections";
import { useGet } from "@typesaurus/react";
import { defaultGroup } from "../../objectDefaults";
import firebase from "firebase";


const Group = () => {
  // page for any kind of youth club, with their name location, contact details, members etc...
  // can be customized by the owner of the youth club
  const router = useRouter();
  const user = firebase.auth().currentUser;
  if (user === null || user.isAnonymous){
      return <LoginRequired />
  }
  
  return <GroupPage group={defaultGroup()} user={user}/>
};

export default Group;