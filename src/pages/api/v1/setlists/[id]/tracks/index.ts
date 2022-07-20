//
//  File:         tracks/index.ts
//  Description:  Exports the handler for the /setlists/[id]/tracks api route
//

// Installed imports
import { NextApiRequest, NextApiResponse } from "next";

// Custom imports
import { BadRequestError, NotFoundError } from "@/server/errors";
import handleError from "@/server/errors/handleError";
import db from "@/database/index";
import { Collections } from "@/database/collections";
import { create } from "@/schemas/setlists/tracks";
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
      case "POST": {
        return await authenticateRequest(req, res, post);
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
//  Returns:      the tracks found on the specified setlist
//
async function get(uid: string, req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  // Fix for type issues for now
  if (!id || Array.isArray(id)) {
    throw new NotFoundError("Track");
  }

  // Ensure the setlist belongs to the user
  await db.findWithUid(Collections.Setlists, id, uid);

  return res
    .status(200)
    .json(
      await db.findAll(`${Collections.Setlists}/${id}/${Collections.Tracks}`)
    );
}

//
//  Function:     post
//  Description:  handles facilitating post requests
//  Params:       uid: string - the user id of the request
//                req: NextApiRequest - the request object
//                res: NextApiResponse - the response object
//  Returns:      the added track to the setlist
//
async function post(uid: string, req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  // Fix for type issues for now
  if (!id || Array.isArray(id)) {
    throw new NotFoundError("Track");
  }

  // Ensure the setlist belongs to the user
  await db.findWithUid(Collections.Setlists, id, uid);

  return res
    .status(201)
    .json(
      await db.insert(
        `${Collections.Setlists}/${id}/${Collections.Tracks}`,
        create.parse(req.body)
      )
    );
}
