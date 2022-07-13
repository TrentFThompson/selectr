//
//  File:         addTrack.ts
//  Description:  Exports the setlist addTrack function
//

// Installed imports
import axios from "axios";

// Custom imports
import { apiURL } from "@/utils/url";
import ITrack from "@/interfaces/Track";

//
// Function:    addTrack
// Description: Uses api to add a track to a setlist
// Parameters:  id: string - the id of the setlist to add to
//              track: ITrack - the track to add to the setlist
// Returns:     the new track added to the setlist
//
export default async function addTrack(id: string, track: ITrack) {
  try {
    const { data } = await axios.post(`${apiURL}/setlists/${id}/tracks`, track);
    return data;
  } catch {
    throw new Error("Server error. Try again later.");
  }
}
