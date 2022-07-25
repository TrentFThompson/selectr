//
//  File:         initial-context.ts
//  Description:  Exports the initial contex of the request system
//

// Installed imports
import { createContext } from "react";

// Custom imports
import IRequest from "@/interfaces/Request";

// Define the context interface
interface IRequestContext {
  requests: IRequest[];
}

// Create the context
const RequestContext = createContext<IRequestContext>({
  requests: [],
});

export default RequestContext;
