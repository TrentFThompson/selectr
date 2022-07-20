//
//  File:         findAll.ts
//  Description:  Exports the setlist findAll function
//

// Installed imports
import axios from "axios";

// Custom imports
import { apiURL } from "@/utils/url";
import setAuthHeader from "@/api/setAuthHeader";

//
// Function:    findAll
// Description: Uses api to find all setlists in the database
// Parameters:  token: string - the authentication token
// Returns:     the list of setlists found
//
export default async function findAll(token: string) {
  try {
    const { data } = await axios.get(
      `${apiURL}/setlists`,
      setAuthHeader(token)
    );
    return data;
  } catch {
    throw new Error("Server error. Try again later.");
  }
}
