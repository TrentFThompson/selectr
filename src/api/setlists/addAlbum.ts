//
//  File:         addAlbum.ts
//  Description:  Exports the setlist addAlbum function
//

// Installed imports
import axios from "axios";

// Custom imports
import { apiURL } from "@/utils/url";
import handleError from "../errors/handleError";
import setAuthHeader from "../setAuthHeader";

//
// Function:    addAlbum
// Description: Uses api to add the tracks of an album to a setlist
// Parameters:  id: string - the id of the setlist to add to
//              albumId: string - the id of the album to add
//              token: string - the token for the auth request
// Returns:     the new album added to the setlist
//
export default async function addTrack(
  id: string,
  albumId: string,
  token: string
) {
  return await handleError(async () => {
    const { data } = await axios.post(
      `${apiURL}/setlists/${id}/albums/${albumId}`,
      {},
      setAuthHeader(token)
    );
    return data;
  });
}
