//
//  File:         signup.ts
//  Description:  Exports the handler for the /auth/signup api route
//

// Installed imports
import { NextApiRequest, NextApiResponse } from "next";

// Custom imports
import { BadRequestError } from "@/server/errors";
import handleError from "@/server/errors/handleError";
import { auth } from "@/lib/firebase-admin";
import { signup } from "@/schemas/auth/signup";

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
//  Description:  handles facilitating post requests - signs up a user
//  Params:       req: NextApiRequest - the request object
//                res: NextApiResponse - the response object
//  Returns:      the newly created user
//
async function post(req: NextApiRequest, res: NextApiResponse) {
  // Validate params
  const { displayName, email, password } = signup.parse(req.body);

  // Create a new user
  await auth.createUser({
    displayName,
    email,
    password,
  });

  // Return only name and email (omit passwords)
  return res.status(201).json({ displayName, email });
}
