//
//  File:         albums/index.ts
//  Description:  Exports the handler for the lastfm/albums api route
//

// Installed imports
import { NextApiRequest, NextApiResponse } from "next";

// Custom imports
import lastFm from "@/server/lastfm";
import { BadRequestError } from "@/server/errors";
import handleError from "@/server/errors/handleError";
import authenticateRequest from "@/server/auth/authenticateRequest";

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
        return await authenticateRequest(req, res, get);
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
//  Params:       uid: string - the user id of the request
//                req: NextApiRequest - the request object
//                res: NextApiResponse - the response object
//  Returns:      Array of albums, potentially 0 length
//
async function get(_: string, req: NextApiRequest, res: NextApiResponse) {
  const { search = "" } = req.query;
  return res.status(200).json(await lastFm.searchAlbums(search));
}
