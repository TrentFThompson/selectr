//
//  File:         createId.ts
//  Description:  Exports a method for creating id's via firebase
//

// Custom imports
import { firestore } from "@/lib/firebase-admin";

//
//  Function:     createId
//  Description:  Creates a unique ID for firebase objects
//  Params:       collection: string - the collection to create the id for
//  Returns:      The unique id generated
//
export default function createId(collection: string) {
  return firestore.collection(collection).doc().id;
}
