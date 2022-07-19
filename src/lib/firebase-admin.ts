//
//  File:         firebase-admin.ts
//  Description:  This file exports the initialized firebase admin module.
//

// Installed imports
import firebaseAdmin from "firebase-admin";

// Initialize the firebase admin module
if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\n/g, "\n"),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    }),
    // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

// Setup exports
const auth = firebaseAdmin.auth();
const firestore = firebaseAdmin.firestore();
// const storage = firebaseAdmin.storage();

export { firestore, auth };
export default firebaseAdmin;
