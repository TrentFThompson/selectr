//
//  File:         addAlbum.ts
//  Description:  Exports the setlist addAlbum function
//

// Installed imports
import axios from "axios";

// Custom imports
import { apiURL } from "@/utils/url";

//
// Function:    addAlbum
// Description: Uses api to add the tracks of an album to a setlist
// Parameters:  id: string - the id of the setlist to add to
//              albumId: string - the id of the album to add
// Returns:     the new album added to the setlist
//
export default async function addTrack(id: string, albumId: string) {
  try {
    const { data } = await axios.post(
      `${apiURL}/setlists/${id}/albums/${albumId}`
    );
    return data;
  } catch {
    throw new Error("Server error. Try again later.");
  }
}
