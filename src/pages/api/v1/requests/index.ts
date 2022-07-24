//
//  File:         requests/index.ts
//  Description:  Exports the handler for the /requests api route
//

// Installed imports
import { NextApiRequest, NextApiResponse } from "next";

// Custom imports
import { BadRequestError } from "@/server/errors";
import handleError from "@/server/errors/handleError";
import { create } from "@/schemas/requests";
import db from "@/database/index";
import { Collections } from "@/database/collections";

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
      case "POST": {
        return await post(req, res);
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
//  Function:     post
//  Description:  handles facilitating post requests - creates a new request for a user
//                req: NextApiRequest - the request object
//                res: NextApiResponse - the response object
//  Returns:      the newly inserted request
//
async function post(req: NextApiRequest, res: NextApiResponse) {
  // Validate the request and insert into the setlist collection
  return res
    .status(201)
    .json(await db.insert(Collections.Requests, { ...create.parse(req.body) }));
}
