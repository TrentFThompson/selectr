//
//  File:         database/index.ts
//  Description:  exports methods for working with the database
//

// Installed imports
import { firestore as db } from "@/lib/firebase-admin";
import { NotFoundError } from "../http/errors";

// Custom imports
import createId from "./createId";

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
    id,
    ...data,
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
//  Function:     remove
//  Description:  removes a document from a specified collection
//  Params:       collection: string - the collection to remove from
//                id: string - the id of the object to remove
//  Returns:      N/A
//
async function remove(collection: string, id: string) {
  await db.collection(collection).doc(id).delete();
}

export default { insert, findAll, find, remove };
