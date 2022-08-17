//
//  File:         search.ts
//  Description:  Exports the tracks search function
//

// Installed imports
import axios from "axios";

// Custom imports
import { apiURL } from "@/utils/url";
import handleError from "../errors/handleError";

//
// Function:    search
// Description: Uses api to find all tracks on a setlist - via search string
// Parameters:  setlistId: string - the id of the document
//              search: string - the string to search with
// Returns:     the list of tracks found
//
export default async function findAll(
  setlistId: string,
  search: string = "",
  page: number = 1,
  searchBy: string = "name"
) {
  return await handleError(async () => {
    const { data } = await axios.get(
      `${apiURL}/setlists/${setlistId}/tracks/search`,
      {
        params: { search, page, searchBy },
      }
    );

    return data;
  });
}
