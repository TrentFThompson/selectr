//
//  File:         info.ts
//  Description:  Exports the lastfm info functions
//

// Installed imports
import axios from "axios";

// Custom imports
import { lastFmURL } from "@/utils/url";
import { NotFoundError, ServerError } from "@/server/errors";

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

    // Standardize the data the way our database wants it
    return {
      mbid,
      artist: data.album.artist,
      tracks: data.album.tracks.track.map((t: any) => ({
        rank: t["@attr"].rank,
        name: t.name,
      })),
      name: data.album.name,
      image: data.album.image.find((i: any) => i.size === "large")["#text"], // Take the large image for display
    };
  } catch (error: any) {
    if (error?.response?.status === 404) {
      throw new NotFoundError("Album");
    } else {
      throw new ServerError();
    }
  }
}
