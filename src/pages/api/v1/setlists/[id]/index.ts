//
//  File:         [id]/index.ts
//  Description:  Exports the handler for the /setlists/[id] api route
//

// Installed imports
import { NextApiRequest, NextApiResponse } from "next";

// Custom imports
import { BadRequestError } from "@/utils/http/errors";
import handleError from "@/utils/server/errors/handleError";
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
//  Function:     get
//  Description:  handles facilitating get requests
//  Params:       req: NextApiRequest - the request object
//                res: NextApiResponse - the response object
//  Returns:
//
async function get(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  return res.status(200).json(await db.find(Collections.Setlists, id));
}

//
//  Function:     _delete
//  Description:  handles facilitating delete requests
//  Params:       req: NextApiRequest - the request object
//                res: NextApiResponse - the response object
//  Returns:
//
async function _delete(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  return res.status(204).json(await db.remove(Collections.Setlists, id));
}
