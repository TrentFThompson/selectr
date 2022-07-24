//
//  File:         use-message.ts
//  Description:  Exports the hook to use the message system
//

// Installed imports
import { useContext } from "react";

// Custom imports
import MessageContext from "./initial-contex";

//
// Function:    useMessage
// Description: hook to use the MessageContext
// Parameters:  none
// Returns:     the message context
//
export default function useMessage() {
  return useContext(MessageContext);
}
