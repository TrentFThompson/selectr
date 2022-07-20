//
//  File:         findOne.ts
//  Description:  Export the album find one api function

// Installed imports
import axios from "axios";

// Custom imports
import { apiURL } from "@/utils/url";
import setAuthHeader from "../setAuthHeader";
import handleError from "../errors/handleError";

//
// Function:    findOne
// Description: Search the lastfm database by ID
// Parameters:  id: string - the id of the album to look up
//              token: string - the token to authenticate with
// Returns:     the individual album found
//
export default async function search(id: string, token: string) {
  return await handleError(async () => {
    const { data } = await axios.get(`${apiURL}/lastfm/albums/info`, {
      params: {
        mbid: id,
      },
      ...setAuthHeader(token),
    });
    return data;
  });
}
