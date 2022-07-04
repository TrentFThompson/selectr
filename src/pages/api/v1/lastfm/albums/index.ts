//
//  File:         index.ts
//  Description:  Exports the handler for the lastfm/albums api route
//

// Installed imports
import { NextApiRequest, NextApiResponse } from "next";

// Custom imports
import lastFm from "@/utils/server/lastfm";

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
  switch (req.method) {
    case "GET": {
      return await get(req, res);
    }
    default: {
      return res
        .status(400)
        .json({ message: "Bad request. Method not implemented." });
    }
  }
}

//
//  Function:     get
//  Description:  handles facilitating get requests
//  Params:       req: NextApiRequest - the request object
//                res: NextApiResponse - the response object
//  Returns:      Array of albums, potentially 0 length
//
async function get(req: NextApiRequest, res: NextApiResponse) {
  const { search = "" } = req.query;
  return res.status(200).json(await lastFm.searchAlbums(search));
}
