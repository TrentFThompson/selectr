//
//  File:         requests/index.ts
//  Description:  Export the request api functions
//

// Custom imports
import markAllAsRead from "./markAllAsRead";
import create from "./create";

// Create the api
const RequestApi = { markAllAsRead, create };

export default RequestApi;
