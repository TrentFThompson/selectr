//
//  File:         markAllAsRead.ts
//  Description:  Exports the setlist markAllAsRead function
//

// Installed imports
import axios from "axios";

// Custom imports
import { apiURL } from "@/utils/url";
import handleError from "../errors/handleError";
import setAuthHeader from "../setAuthHeader";

//
// Function:    markAllAsRead
// Description: Uses api to mark requests as read for a user
// Parameters:  token: string - the token for the auth request
// Returns:     the new album added to the setlist
//
export default async function markAllAsRead(token: string) {
  return await handleError(async () => {
    const { data } = await axios.patch(
      `${apiURL}/requests`,
      {},
      setAuthHeader(token)
    );
    return data;
  });
}
