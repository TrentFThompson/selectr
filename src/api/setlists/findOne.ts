//
//  File:         findOne.ts
//  Description:  Exports the setlist findOne function
//

// Installed imports
import axios from "axios";

// Custom imports
import { apiURL } from "@/utils/url";

//
// Function:    findOne
// Description: Uses api to find a setlist in the database
// Parameters:  none
// Returns:     the setlist from the database
//
export default async function findOne(id: string) {
  try {
    const { data } = await axios.get(`${apiURL}/setlists/${id}`);
    return data;
  } catch {
    throw new Error("Server error. Try again later.");
  }
}
