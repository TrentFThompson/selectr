//
//  File:         search.ts
//  Description:  Export the album search api function

// Installed imports
import axios from "axios";

// Custom imports
import { apiURL } from "@/utils/url";
import handleError from "../errors/handleError";
import setAuthHeader from "../setAuthHeader";

//
// Function:    search
// Description: Search the albums in the lastfm database
// Parameters:  search: string - the string to search with
//              token: string - the token for the request
// Returns:     the list of albums found
//
export default async function search(search: string, token: string) {
  return await handleError(async () => {
    const { data } = await axios.get(`${apiURL}/lastfm/albums`, {
      params: {
        search,
      },
      ...setAuthHeader(token),
    });

    return data;
  });
}
