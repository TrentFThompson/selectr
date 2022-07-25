//
//  File:         firebase.ts
//  Description:  This file exports the initialized firebase module.
//

// Installed imports
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import "firebase/compat/storage";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

// setup auth
const auth = firebase.auth();
const firestore = firebase.firestore();
export { auth, firestore };

export default firebase;
