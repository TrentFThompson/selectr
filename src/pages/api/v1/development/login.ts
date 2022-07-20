//
//  File:         login.ts
//  Description:  Exports the handler for the /development/login
//

// Installed imports
import { NextApiRequest, NextApiResponse } from "next";

// Custom imports
import { BadRequestError } from "@/server/errors";
import handleError from "@/server/errors/handleError";
import { auth } from "@/lib/firebase";

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
    if (process.env.NODE_ENV !== "production") {
      switch (req.method) {
        case "POST": {
          return await post(req, res);
        }
        default: {
          throw new BadRequestError("Method not implemented.");
        }
      }
    } else {
      throw new BadRequestError("Method not implemented.");
    }
  } catch (error: any) {
    return handleError(error, res);
  }
}

//
//  Function:     post
//  Description:  handles facilitating post requests - signs in a user (development only)
//  Params:       req: NextApiRequest - the request object
//                res: NextApiResponse - the response object
//  Returns:      the signed in user
//
async function post(req: NextApiRequest, res: NextApiResponse) {
  // Get params and error check
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Bad request. No POST body.");
  }

  // Try to sign in with auth provider
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);

    // Get auth token and return
    const token = await user!.getIdToken();
    return res.status(200).send({ token });
  } catch (error) {
    return res.status(400).send("Something went wrong.");
  }
}
