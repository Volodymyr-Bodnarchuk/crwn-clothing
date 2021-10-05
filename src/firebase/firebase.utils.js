import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyA7a25ZA1uAfF8f8NVfiC0qVFQHBExprJw",
  authDomain: "crwn-db-f051d.firebaseapp.com",
  projectId: "crwn-db-f051d",
  storageBucket: "crwn-db-f051d.appspot.com",
  messagingSenderId: "39959836919",
  appId: "1:39959836919:web:4b789f1004e2072df1fbf2",
  measurementId: "G-YGEGXQQKES",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
