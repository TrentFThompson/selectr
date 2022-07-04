//
//  File:         info.ts
//  Description:  Exports the lastfm info functions
//

// Installed imports
import axios from "axios";

// Custom imports
import { lastFmURL } from "@/utils/url";

//
//  Function:     albumInfo
//  Description:  Gets album info for a specified album
//  Params:       artist: string - the album artist
//                album: string - the album name
//  Returns:      Object
//
export async function albumInfo(
  artist: string | string[],
  album: string | string[]
) {
  try {
    const { data } = await axios.get(lastFmURL, {
      params: {
        method: "album.getinfo",
        artist,
        album,
        api_key: process.env.LAST_FM_KEY,
        format: "json",
      },
    });

    return data;
  } catch {
    return { message: "Error finding album." };
  }
}
