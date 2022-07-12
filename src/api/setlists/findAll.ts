//
//  File:         findAll.ts
//  Description:  Exports the setlist findAll function
//

// Installed imports
import axios from "axios";

// Custom imports
import { apiURL } from "@/utils/url";

//
// Function:    findAll
// Description: Uses api to find all setlists in the database
// Parameters:  none
// Returns:     the list of setlists found
//
export default async function findAll() {
  try {
    const { data } = await axios.get(`${apiURL}/setlists`);
    return data;
  } catch {
    throw new Error("Server error. Try again later.");
  }
}
