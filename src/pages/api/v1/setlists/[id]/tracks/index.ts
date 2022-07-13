//
//  File:         tracks/index.ts
//  Description:  Exports the handler for the /setlists/[id]/tracks api route
//

// Installed imports
import { NextApiRequest, NextApiResponse } from "next";

// Custom imports
import { BadRequestError } from "@/server/errors";
import handleError from "@/server/errors/handleError";
import db from "@/database/index";
import { Collections } from "@/database/collections";
import { create } from "@/schemas/setlists/tracks";

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
//  Returns:      the tracks found on the specified setlist
//
async function get(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  return res
    .status(200)
    .json(
      await db.findAll(`${Collections.Setlists}/${id}/${Collections.Tracks}`)
    );
}

//
//  Function:     post
//  Description:  handles facilitating post requests
//  Params:       req: NextApiRequest - the request object
//                res: NextApiResponse - the response object
//  Returns:      the added track to the setlist
//
async function post(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  return res
    .status(201)
    .json(
      await db.insert(
        `${Collections.Setlists}/${id}/${Collections.Tracks}`,
        create.parse(req.body)
      )
    );
}
