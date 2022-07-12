//
//  File:         search.ts
//  Description:  Export the album search api function

// Installed imports
import axios from "axios";

// Custom imports
import { apiURL } from "@/utils/url";

//
// Function:    search
// Description: Search the albums in the lastfm database
// Parameters:  search: string - the string to search with
// Returns:     the list of albums found
//
export default async function search(search: string) {
  try {
    // Try to make a request for the album data
    const { data } = await axios.get(`${apiURL}/lastfm/albums`, {
      params: {
        search,
      },
    });

    return data;
  } catch {
    // error to display if something goes wrong
    throw new Error("Server error. Try again later.");
  }
}
