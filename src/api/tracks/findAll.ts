//
//  File:         findAll.ts
//  Description:  Exports the tracks findAll function
//

// Installed imports
import axios from "axios";

// Custom imports
import { apiURL } from "@/utils/url";
import setAuthHeader from "../setAuthHeader";
import handleError from "../errors/handleError";

//
// Function:    findAll
// Description: Uses api to find all tracks on a setlist
// Parameters:  setlistId: string - the id of the document
//              token: string - the token for the request authentication
// Returns:     the list of tracks found
//
export default async function findAll(setlistId: string, token: string) {
  return await handleError(async () => {
    const { data } = await axios.get(
      `${apiURL}/setlists/${setlistId}/tracks`,
      setAuthHeader(token)
    );
    return data;
  });
}
