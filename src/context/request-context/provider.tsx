//
//  File:         provider.ts
//  Description:  Exports the provider component for request context
//

// Installed imports
import { query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

// Custom imports
import { firestore } from "@/lib/firebase";
import RequestContext from "./initial-context";
import { Collections } from "@/database/collections";
import { useAuth } from "../auth-context";

// Props for auth provider
interface IProps {
  children: JSX.Element;
}

//
// Component:   RequestProvider
// Description: Provides the requests where needed
//
export default function RequestProvider({ children }: IProps) {
  // Get the user so we can use their id
  const { user } = useAuth();

  // Query for requests
  const requestsQuery = firestore
    .collection(Collections.Requests)
    .where("uid", "==", user?.uid || "")
    .orderBy("createdAt");

  // Listen to changes on request table, with our specified query
  // TODO: Figure out types, "any" for now
  const [requests] = useCollectionData<any>(query(requestsQuery));

  return (
    <RequestContext.Provider value={{ requests: requests || [] }}>
      {children}
    </RequestContext.Provider>
  );
}
