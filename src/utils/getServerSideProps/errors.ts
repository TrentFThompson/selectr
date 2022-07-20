//
//  File:         errors.ts
//  Description:  Exports the errors for ServerSideProps
//

//
//  Class:        SSPError
//  Description:  Base SSP error object for error handling
//
export class SSPError extends Error {
  constructor(message: string) {
    super(message);
  }
}

//
//  Class:        SSPAuthError
//  Description:  Defines an auth error for SSP
//
export class SSPAuthError extends SSPError {
  constructor() {
    super("Request not authenticated.");
  }
}
