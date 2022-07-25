//
//  File:         use-requests.ts
//  Description:  Exports the hook to use the request notification system
//

// Installed imports
import { useContext } from "react";

// Custom imports
import RequestContext from "./initial-context";

//
// Function:    useRequests
// Description: hook to use the request context
// Parameters:  none
// Returns:     the request context
//
export default function useRequests() {
  return useContext(RequestContext);
}
