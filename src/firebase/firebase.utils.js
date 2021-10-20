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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};
firebase.initializeApp(config);

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;

    return accumulator;
  }, {});
};
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscibe = auth.onAuthStateChanged((userAuth) => {
      unsubscibe();
      resolve(userAuth);
    }, reject);
  });
};
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;

// export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
//   const collectionRef = firestore.collection(collectionKey);
//   console.log(collectionRef);

//   const batch = firestore.batch();
//   objectToAdd.forEach((obj) => {
//     const newDocRef = collectionRef.doc();
//     batch.set(newDocRef, obj);
//   });

//   return await batch.commit();
// };
