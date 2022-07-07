//
//  File:         info.ts
//  Description:  Exports the lastfm info functions
//

// Installed imports
import axios from "axios";

// Custom imports
import { lastFmURL } from "@/utils/url";
import { NotFoundError, ServerError } from "@/utils/http/errors";

//
//  Function:     albumInfo
//  Description:  Gets album info for a specified album
//  Params:       artist: string - the album artist
//                album: string - the album name
//  Returns:      Object
//
export async function albumInfo(mbid: string | string[]) {
  try {
    const { data } = await axios.get(lastFmURL, {
      params: {
        method: "album.getinfo",
        mbid,
        api_key: process.env.LAST_FM_KEY,
        format: "json",
      },
    });

    return data;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      throw new NotFoundError("Album");
    } else {
      throw new ServerError();
    }
  }
}
