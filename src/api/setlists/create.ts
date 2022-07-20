//
//  File:         create.ts
//  Description:  Exports the setlist create function
//

// Installed imports
import axios from "axios";

// Custom imports
import { apiURL } from "@/utils/url";
import handleError from "../errors/handleError";
import setAuthHeader from "../setAuthHeader";

//
// Function:    create
// Description: Uses api to create a setlist
// Parameters:  name: string - the name of the new setlist
//              token: string - the token for the auth request
// Returns:     the new setlist
//
export default async function create(name: string, token: string) {
  return await handleError(async () => {
    const { data } = await axios.post(
      `${apiURL}/setlists`,
      { name },
      setAuthHeader(token)
    );
    return data;
  });
}
