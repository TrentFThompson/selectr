//
//  File:         database/index.ts
//  Description:  exports methods for working with the database
//

// Custom imports
import createId from "./createId";
import { NotFoundError } from "@/server/errors";
import firebase, { firestore as db } from "@/lib/firebase-admin";

//
//  Function:     insert
//  Description:  Inserts data (with generated ID) to firebase collection
//  Params:       collection: string - the collection to add to
//                data: object - the data to add to the collection
//  Returns:      The object inserted into the database
//
async function insert(collection: string, data: object) {
  // Create an id and add to the data
  const id = createId(collection);
  data = {
    ...data,
    id,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  };

  // Insert into database and return the data with id
  await db.collection(collection).doc(id).set(data);
  return data;
}

//
//  Function:     findAll
//  Description:  finds list of data in a collection
//  Params:       collection: string - the collection to read from
//  Returns:      The data found in the database
//
async function findAll(collection: string) {
  // Get the data
  const { docs } = await db.collection(collection).get();
  return docs.map((d) => d.data());
}

//
//  Function:     findAllWithId
//  Description:  finds list of data in a collection with a specific UID
//  Params:       collection: string - the collection to read from
//                uid: string - the uid on the document
//  Returns:      The data found in the database
//
async function findAllWithUid(collection: string, uid: string) {
  // Get the data
  const { docs } = await db
    .collection(collection)
    .where("uid", "==", uid)
    .get();
  return docs.map((d) => d.data());
}

//
//  Function:     find
//  Description:  finds a document in a specified collection
//  Params:       collection: string - the collection to read from
//                id: string - the id of the object to find
//  Returns:      The data found in the database
//
async function find(collection: string, id: string) {
  const doc = await db.collection(collection).doc(id).get();
  if (!doc.exists) {
    throw new NotFoundError(`${collection} document`);
  }
  return doc.data();
}

//
//  Function:     findWithUid
//  Description:  finds a document in a specified collection with a UID
//  Params:       collection: string - the collection to read from
//                id: string - the id of the object to find
//                uid: string - the uid of the user
//  Returns:      The data found in the database
//
async function findWithUid(collection: string, id: string, uid: string) {
  const doc = await db.collection(collection).doc(id).get();
  const data = doc.data();

  if (!doc.exists || data?.uid !== uid) {
    throw new NotFoundError(`${collection} document`);
  }
  return doc.data();
}

//
//  Function:     remove
//  Description:  removes a document from a specified collection
//  Params:       collection: string - the collection to remove from
//                id: string - the id of the object to remove
//  Returns:      N/A
//
async function remove(collection: string, id: string) {
  await db.collection(collection).doc(id).delete();
}

//
//  Function:     remove
//  Description:  removes a document from a specified collection
//  Params:       collection: string - the collection to remove from
//                id: string - the id of the object to remove
//  Returns:      N/A
//
async function removeCollection(collection: string) {
  // Get a snapshot of the collection
  const snapshot = await db.collection(collection).get();

  // Remove each document in the collection
  snapshot.forEach((doc) => doc.ref.delete());
}

export default {
  insert,
  findAll,
  findAllWithUid,
  find,
  findWithUid,
  remove,
  removeCollection,
};
