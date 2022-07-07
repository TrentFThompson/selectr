//
//  File:         handleError.ts
//  Description:  Exports error handler for express server
//

// Installed imports
import { HttpError } from "@/utils/http/errors";
import { NextApiResponse } from "next";

//
//  Function:     handleError
//  Description:  Handles sending error responses from the express server
//  Params:       error: Error - the error to handle
//                res: NextApiResponse - the object to send a response with
//  Returns:      Handles sending status and json with error message
//
export default function handleError(error: Error, res: NextApiResponse) {
  // Check if our error conforms to our standard
  if (error instanceof HttpError) {
    return res.status(error.status).json({ message: error.message });
  }

  // If not return a standardized 500 error
  return res.status(500).json({ message: "Inernal server error." });
}
