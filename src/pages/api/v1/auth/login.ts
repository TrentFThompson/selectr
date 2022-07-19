//
//  File:         login.ts
//  Description:  Exports the handler for the auth/login api route
//

// Installed imports
import type { NextApiRequest, NextApiResponse } from "next";
import { setAuthCookies } from "next-firebase-auth";

// Custom imports
import initAuth from "@/utils/auth/initAuth";

// Initialize auth
initAuth();

//
//  Function:     handler
//  Description:  handles facilitating the requests to login
//  Params:       req: NextApiRequest - the request object
//                res: NextApiResponse - the response object
//
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await setAuthCookies(req, res);
  } catch (e) {
    return res.status(500).json({ error: "Unexpected error." });
  }
  return res.status(200).json({ success: true });
}
