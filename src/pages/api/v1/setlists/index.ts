//
//  File:         setlists/index.ts
//  Description:  Exports the handler for the /setlists api route
//

// Installed imports
import { NextApiRequest, NextApiResponse } from "next";

// Custom imports
import { BadRequestError } from "@/utils/http/errors";
import handleError from "@/utils/server/errors/handleError";
import { create } from "@/utils/schemas/setlists";
import db from "@/utils/database";
import { Collections } from "@/utils/database/collections";

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
//  Function:     get
//  Description:  handles facilitating get requests
//  Params:       req: NextApiRequest - the request object
//                res: NextApiResponse - the response object
//  Returns:
//
async function get(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json(await db.findAll(Collections.Setlists));
}

//
//  Function:     post
//  Description:  handles facilitating post requests
//  Params:       req: NextApiRequest - the request object
//                res: NextApiResponse - the response object
//  Returns:
//
async function post(req: NextApiRequest, res: NextApiResponse) {
  // Validate the request and insert into the setlist collection
  return res
    .status(201)
    .json(await db.insert(Collections.Setlists, create.parse(req.body)));
}
