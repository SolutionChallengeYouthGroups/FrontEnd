import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// SECRET KEY do not make public
let firebaseConfig = {
  apiKey: "AIzaSyDC7dHYwCfbhfr3XKlz8x1CRWiApoA0at4",
  authDomain: "soltuionchallenge.firebaseapp.com",
  projectId: "soltuionchallenge",
  storageBucket: "soltuionchallenge.appspot.com",
  messagingSenderId: "860919932925",
  appId: "1:860919932925:web:ca64348dc16c78c6f81b94",
  measurementId: "G-BWV8G22JDE",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

export default firebase;
