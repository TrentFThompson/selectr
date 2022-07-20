//
//  File:         errors.ts
//  Description:  Defines the error objects used by the system
//

//
//  Class:        HttpError
//  Description:  Base HTTP error object for error handling
//
export class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

//
//  Class:        NotFoundError
//  Description:  Defines a 404 error for error handling
//
export class NotFoundError extends HttpError {
  constructor(item: string) {
    super(`${item} not found.`, 404);
  }
}

//
//  Class:        ServerError
//  Description:  Defines a 500 error for error handling
//
export class ServerError extends HttpError {
  constructor() {
    super("Internal server error.", 500);
  }
}

//
//  Class:        BadRequestError
//  Description:  Defines a 400 error for error handling
//
export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(`Bad request. ${message}.`, 400);
  }
}

//
//  Class:        AuthError
//  Description:  Defines a 401 error for error handling
//
export class AuthError extends HttpError {
  constructor() {
    super("Bad request. Please authenticate.", 401);
  }
}
