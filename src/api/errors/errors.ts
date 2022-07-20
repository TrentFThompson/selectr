//
//  File:         errors.ts
//  Description:  Defines the error objects used by the frontend api
//

//
//  Class:        ApiError
//  Description:  Base API error for frontend
//
export class ApiError extends Error {
  constructor(message: string) {
    super(message);
  }
}

//
//  Class:        AuthError
//  Description:  Auth error for frontend
//
export class AuthError extends ApiError {
  constructor() {
    super(
      "There was an issue processing your request. Please log in and try again."
    );
  }
}

//
//  Class:        ServerError
//  Description:  Server error for frontend
//
export class ServerError extends ApiError {
  constructor() {
    super("Server error. Try again later.");
  }
}
