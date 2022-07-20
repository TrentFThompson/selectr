//
//  File:         [id]/index.ts
//  Description:  Exports the handler for the /setlists/[id] api route
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
      case "GET": {
        return await get(req, res);
      }
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
//  Function:     get
//  Description:  handles facilitating get requests - gets a setlist
//  Params:       req: NextApiRequest - the request object
//                res: NextApiResponse - the response object
//  Returns:      the requested document
//
async function get(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Fix for type issues for now
  if (!id || Array.isArray(id)) {
    throw new NotFoundError("Setlist");
  }

  return res.status(200).json(await db.find(Collections.Setlists, id));
}

//
//  Function:     _delete
//  Description:  handles facilitating delete requests - removes a setlist
//  Params:       req: NextApiRequest - the request object
//                res: NextApiResponse - the response object
//  Returns:      204 response (no body)
//
async function _delete(uid: string, req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Fix for type issues for now
  if (!id || Array.isArray(id)) {
    throw new NotFoundError("Setlist");
  }

  // Remove the tracks subcollection of the setlist
  await db.removeCollection(
    `${Collections.Setlists}/${id}/${Collections.Tracks}`
  );

  // Remove the setlist from the setlist collection
  return res.status(204).json(await db.remove(Collections.Setlists, id));
}
