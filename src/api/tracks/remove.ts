//
//  File:         remove.ts
//  Description:  Exports the track remove function
//

// Installed imports
import axios from "axios";

// Custom imports
import { apiURL } from "@/utils/url";
import handleError from "../errors/handleError";
import setAuthHeader from "../setAuthHeader";

//
// Function:    remove
// Description: Uses api to remove a track from a setlist
// Parameters:  setlistId: string - the id of the setlist to remove from
//              trackId: string - the id of the track to remove
//              token: string - the token for the auth request
// Returns:     n/a
//
export default async function remove(
  setlistId: string,
  trackId: string,
  token: string
) {
  return await handleError(async () => {
    await axios.delete(
      `${apiURL}/setlists/${setlistId}/tracks/${trackId}`,
      setAuthHeader(token)
    );
  });
}
