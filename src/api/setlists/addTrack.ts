//
//  File:         addTrack.ts
//  Description:  Exports the setlist addTrack function
//

// Installed imports
import axios from "axios";

// Custom imports
import { apiURL } from "@/utils/url";
import ITrack from "@/interfaces/Track";
import handleError from "../errors/handleError";
import setAuthHeader from "../setAuthHeader";

//
// Function:    addTrack
// Description: Uses api to add a track to a setlist
// Parameters:  id: string - the id of the setlist to add to
//              track: ITrack - the track to add to the setlist
//              token: string - the token for the auth request
// Returns:     the new track added to the setlist
//
export default async function addTrack(
  id: string,
  track: ITrack,
  token: string
) {
  return await handleError(async () => {
    const { data } = await axios.post(
      `${apiURL}/setlists/${id}/tracks`,
      track,
      setAuthHeader(token)
    );
    return data;
  });
}
