//
//  File:         findOne.ts
//  Description:  Exports the setlist findOne function
//

// Installed imports
import axios from "axios";

// Custom imports
import { apiURL } from "@/utils/url";
import handleError from "../errors/handleError";
import setAuthHeader from "../setAuthHeader";

//
// Function:    findOne
// Description: Uses api to find a setlist in the database
// Parameters:  id: string - the id of the document to find
//              token: string - the token for the auth request
// Returns:     the setlist from the database
//
export default async function findOne(id: string, token: string) {
  return await handleError(async () => {
    const { data } = await axios.get(
      `${apiURL}/setlists/${id}`,
      setAuthHeader(token)
    );
    return data;
  });
}
