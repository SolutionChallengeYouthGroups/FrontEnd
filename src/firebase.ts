import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage"

// SECRET KEY do not make public
let firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "glink-28cd3.firebaseapp.com",
  projectId: "glink-28cd3",
  storageBucket: "glink-28cd3.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: "1:118909215413:web:ff857e0c9c57ad50f294fc"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage(); 
export default firebase;
