//
//  File:         [trackId].ts
//  Description:  Exports the handler for the /setlists/[id]/tracks/[trackId] api route
//

// Installed imports
import { NextApiRequest, NextApiResponse } from "next";

// Custom imports
import { BadRequestError, NotFoundError } from "@/server/errors";
import handleError from "@/server/errors/handleError";
import db from "@/database/index";
import { Collections } from "@/database/collections";
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
      case "DELETE": {
        return await authenticateRequest(req, res, _delete);
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
//  Params:       uid: string - the user id of the request
//                req: NextApiRequest - the request object
//                res: NextApiResponse - the response object
//  Returns:      N/A
//
async function _delete(uid: string, req: NextApiRequest, res: NextApiResponse) {
  const { id, trackId } = req.query;

  // Fix for type issues for now
  if (!trackId || Array.isArray(trackId)) {
    throw new NotFoundError("Track");
  }
  // Fix for type issues for now
  if (!id || Array.isArray(id)) {
    throw new NotFoundError("Track");
  }

  // Ensure the setlist belongs to the user
  await db.findWithUid(Collections.Setlists, id, uid);

  return res
    .status(204)
    .json(
      await db.remove(
        `${Collections.Setlists}/${id}/${Collections.Tracks}`,
        trackId
      )
    );
}
