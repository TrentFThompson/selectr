//
//  File:         handleError.ts
//  Description:  Defines the handle error function for frontend api requests
//

// Custom imports
import { AuthError, ServerError } from "./errors";

//
// Function:    handleError
// Description: Handles api request errors for the frontend
// Parameters:  request: Function - the request function to call
// Returns:     the return value of the request function
//
export default async function handleError(request: Function) {
  try {
    return await request();
  } catch (error: any) {
    // Check if it's an auth error
    if (error?.response?.status === 401) {
      throw new AuthError();
    } else {
      throw new ServerError();
    }
  }
}
