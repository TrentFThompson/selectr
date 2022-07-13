//
//  File:         findAll.ts
//  Description:  Exports the tracks findAll function
//

// Installed imports
import axios from "axios";

// Custom imports
import { apiURL } from "@/utils/url";

//
// Function:    findAll
// Description: Uses api to find all tracks on a setlist
// Parameters:  none
// Returns:     the list of tracks found
//
export default async function findAll(setlistId: string) {
  try {
    const { data } = await axios.get(`${apiURL}/setlists/${setlistId}/tracks`);
    return data;
  } catch {
    throw new Error("Server error. Try again later.");
  }
}
