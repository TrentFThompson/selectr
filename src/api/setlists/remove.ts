//
//  File:         remove.ts
//  Description:  Exports the setlist remove function
//

// Installed imports
import axios from "axios";

// Custom imports
import { apiURL } from "@/utils/url";

//
// Function:    remove
// Description: Uses api to remove a setlist
// Parameters:  id: string - the id of the setlist to remove
// Returns:     n/a
//
export default async function remove(id: string) {
  try {
    await axios.delete(`${apiURL}/setlists/${id}`);
  } catch {
    throw new Error("Server error. Try again later.");
  }
}
