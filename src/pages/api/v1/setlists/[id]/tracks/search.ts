//
//  File:         search.ts
//  Description:  Exports the handler for the /setlists/[id]/tracks/search api route
//

// Installed imports
import { NextApiRequest, NextApiResponse } from "next";

// Custom imports
import { BadRequestError, NotFoundError } from "@/server/errors";
import handleError from "@/server/errors/handleError";
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
      case "GET": {
        return await get(req, res);
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
//  Description:  handles facilitating get requests - returns tracks based on search param
//  Params:       req: NextApiRequest - the request object
//                res: NextApiResponse - the response object
//  Returns:      the tracks found on the specified setlist
//
async function get(req: NextApiRequest, res: NextApiResponse) {
  const { id, search, page, searchBy } = req.query;
  // Fix for type issues for now
  if (
    !id ||
    Array.isArray(id) ||
    Array.isArray(search) ||
    Array.isArray(page) ||
    Array.isArray(searchBy)
  ) {
    throw new NotFoundError("Track");
  }

  return res
    .status(200)
    .json(
      await db.search(
        `${Collections.Setlists}/${id}/${Collections.Tracks}`,
        searchBy ? `${searchBy.toLowerCase()}_upper` : "name_upper",
        search?.toUpperCase() || "",
        parseInt(page || "1")
      )
    );
}
