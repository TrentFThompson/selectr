//
//  File:         remove.ts
//  Description:  Exports the track remove function
//

// Installed imports
import axios from "axios";

// Custom imports
import { apiURL } from "@/utils/url";

//
// Function:    remove
// Description: Uses api to remove a track from a setlist
// Parameters:  setlistId: string - the id of the setlist to remove from
//              trackId: string - the id of the track to remove
// Returns:     n/a
//
export default async function remove(setlistId: string, trackId: string) {
  try {
    await axios.delete(`${apiURL}/setlists/${setlistId}/tracks/${trackId}`);
  } catch {
    throw new Error("Server error. Try again later.");
  }
}
