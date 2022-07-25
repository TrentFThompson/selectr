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
import RequestApi from "@/api/requests";
import IRequest from "@/interfaces/Request";

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
  const { user, authRequest } = useAuth();

  // Query for requests
  const requestsQuery = firestore
    .collection(Collections.Requests)
    .where("uid", "==", user?.uid || "")
    .orderBy("createdAt");

  // Listen to changes on request table, with our specified query
  // TODO: Figure out types, "any" for now
  const [requests] = useCollectionData<any>(query(requestsQuery));

  //
  // Function:    markAsRead
  // Description: Handles using api to mark all requests as read
  // Parameters:  none
  // Returns:     n/a
  //
  async function markAsRead() {
    authRequest(async (token: string) => {
      return await RequestApi.markAllAsRead(token);
    });
  }

  //
  // Function:    countUnreadRequests
  // Description: counts how many requests are unread, for the unreadRequests value
  // Parameters:  none
  // Returns:     n/a
  //
  function countUnreadRequests() {
    const unreadRequests =
      requests?.filter((r: IRequest) => r.read !== true) || [];
    return unreadRequests.length;
  }

  return (
    <RequestContext.Provider
      value={{
        requests: requests || [],
        markAsRead,
        unreadRequests: countUnreadRequests(),
      }}
    >
      {children}
    </RequestContext.Provider>
  );
}
