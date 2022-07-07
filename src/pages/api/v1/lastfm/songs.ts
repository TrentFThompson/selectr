//
//  File:         songs.ts
//  Description:  Exports the handler for the lastfm/songs api route
//

// Installed imports
import { NextApiRequest, NextApiResponse } from "next";

// Custom imports
import lastFm from "@/utils/server/lastfm";
import { BadRequestError } from "@/utils/http/errors";
import handleError from "@/utils/server/errors/handleError";

//
//  Function:     handler
//  Description:  handles facilitating the different request methods
//  Params:       req: NextApiRequest - the request object
//                res: NextApiResponse - the response object
//
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET": {
        return await get(req, res);
      }
      default: {
        throw new BadRequestError("Method not implemented");
      }
    }
  } catch (error: any) {
    return handleError(error, res);
  }
}

//
//  Function:     get
//  Description:  handles facilitating get requests
//  Params:       req: NextApiRequest - the request object
//                res: NextApiResponse - the response object
//  Returns:      Array of songs, potentially 0 length
//
async function get(req: NextApiRequest, res: NextApiResponse) {
  const { search = "" } = req.query;
  return res.status(200).json(await lastFm.searchTracks(search));
}
