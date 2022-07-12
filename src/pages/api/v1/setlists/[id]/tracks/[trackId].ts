//
//  File:         [trackId].ts
//  Description:  Exports the handler for the /setlists/[id]/tracks/[trackId] api route
//

// Installed imports
import { NextApiRequest, NextApiResponse } from "next";

// Custom imports
import { BadRequestError } from "server/errors";
import handleError from "server/errors/handleError";
import db from "database";
import { Collections } from "database/collections";

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
      case "DELETE": {
        return await _delete(req, res);
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
//  Function:     _delete
//  Description:  remove a song from a specified setlist
//  Params:       req: NextApiRequest - the request object
//                res: NextApiResponse - the response object
//  Returns:      N/A
//
async function _delete(req: NextApiRequest, res: NextApiResponse) {
  const { id, trackId } = req.query;
  return res
    .status(204)
    .json(
      await db.remove(
        `${Collections.Setlists}/${id}/${Collections.Tracks}`,
        trackId
      )
    );
}
