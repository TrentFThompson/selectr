//
//  File:         findOne.ts
//  Description:  Export the album find one api function

// Installed imports
import axios from "axios";

// Custom imports
import { apiURL } from "@/utils/url";

//
// Function:    findOne
// Description: Search the lastfm database by ID
// Parameters:  id: string - the id of the album to look up
// Returns:     the individual album found
//
export default async function search(id: string) {
  try {
    const { data } = await axios.get(`${apiURL}/lastfm/albums/info`, {
      params: {
        mbid: id,
      },
    });
    return data;
  } catch {
    // error to display if something goes wrong
    throw new Error("Server error. Try again later.");
  }
}
