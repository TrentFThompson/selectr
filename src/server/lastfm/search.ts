//
//  File:         search.ts
//  Description:  Exports the lastfm search functions
//

// Installed imports
import axios from "axios";

// Custom imports
import { lastFmURL } from "@/utils/url";

// Constants
const MAX_LIMIT = 25;
const DEFAULT_LIMIT = 10;

//
//  Function:     searchTracks
//  Description:  Searches the last fm database for tracks based on
//                search string provided
//  Params:       searchText: string - the string to use for searching
//                limit: number - the limit for search results
//  Returns:      Array of songs, potentially 0 length
//
// export async function searchTracks(
//   searchText: string | string[],
//   limit: number = DEFAULT_LIMIT
// ) {
//   const { data } = await axios.get(lastFmURL, {
//     params: {
//       method: "track.search",
//       track: searchText,
//       api_key: process.env.LAST_FM_KEY,
//       format: "json",
//       limit: limit >= MAX_LIMIT ? MAX_LIMIT : limit, // Don't allow limit over 25
//     },
//   });

//   return data.results?.trackmatches?.track || [];
// }

//
//  Function:     searchAlbums
//  Description:  Searches the last fm database for albums based on
//                search string provided
//  Params:       searchText: string - the string to use for searching
//                limit: number - the limit for search results
//  Returns:      Array of songs, potentially 0 length
//
export async function searchAlbums(
  searchText: string | string[],
  limit: number = DEFAULT_LIMIT
) {
  try {
    const { data } = await axios.get(lastFmURL, {
      params: {
        method: "album.search",
        album: searchText,
        api_key: process.env.LAST_FM_KEY,
        format: "json",
        limit: limit >= MAX_LIMIT ? MAX_LIMIT : limit, // Don't allow limit over 25
      },
    });

    return data.results?.albummatches?.album || [];
  } catch {
    return [];
  }
}
