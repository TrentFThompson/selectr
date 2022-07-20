//
//  File:         authenticateRequest.ts
//  Description:  Exports the auth handler for the api
//

// Installed imports
import { NextApiRequest, NextApiResponse } from "next";

// Custom imports
import { auth } from "@/lib/firebase-admin";
import { AuthError } from "../errors";

//
//  Function:     authenticateRequest
//  Description:  gets the uid from a token on the api
//  Params:       req: NextApiRequest - the request object
//                res: NextApiResponse - the response object
//                next: function - the function to call after authenticating
//  Returns:      the return of the next function
//
export default async function authenticateRequest(
  req: NextApiRequest,
  res: NextApiResponse,
  next: (uid: string, req: NextApiRequest, res: NextApiResponse) => Promise<any>
) {
  // Check if the header is there
  if (!req.headers.authorization) {
    throw new AuthError();
  }

  // Get the token value from the request header
  const token = req.headers.authorization.replace("Bearer ", "");

  // Verify the token
  const { uid } = await verifyToken(token);

  // Call next function with the uid
  return await next(uid, req, res);
}

//
//  Function:     verifyToken
//  Description:  verifies a token for the server
//  Params:       token: string - the token to verify
//  Returns:      the result of verifying the token
//
async function verifyToken(token: string) {
  try {
    return await auth.verifyIdToken(token);
  } catch {
    throw new AuthError();
  }
}
