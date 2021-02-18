import { auth, firestore } from "../firebase";
// Hooks 
import { useState, useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth";

// Using useAuthState from react-firebase-hooks to get current user object. 
const useUserData = () => { 
    const [user] = useAuthState(auth); // gets current logged in user info - this is data you see from IndexedDB/firebaseLocalStorage Value
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    
    useEffect(() => {
      let unsubscribe; // turns off realtime subscription when it is no longer needed 
      if (user) {
        setEmail(user.email); // We don't have to define email - this is for demonstration purposes
        // get the document with the user's id from the users collection.
        const docRef = firestore.collection("users").doc(user.uid);
        // When we call docRef.onSnapshot() - firebase returns a function that (if called) unsubscribes from the docRef data. 
        unsubscribe = docRef.onSnapshot((doc: { data: () => any; }) => {
          // doc is a callback function that returns the latest doc data from firestore
          // so we take this data and setUsername to whatever is in the document.
          setUsername(doc.data()?.username);
        });
      } else {
        setUsername(null);
      }
    
      return unsubscribe;
    }, [user])

    return { user, username, email }; // Whatever const we have defined we should return so whenever a function uses our usUserData hook it will get whatever we return here.
}

export default useUserData;

