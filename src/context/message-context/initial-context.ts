//
//  File:         initial-context.ts
//  Description:  Exports the initial contex of the message
//                display system
//

// Installed imports
import { createContext } from "react";

// Define the context for the message system
interface IMessageContext {
  success: (message: string) => void;
  failure: (message: string) => void;
}

// Create the initial message system context
const MessageContext = createContext<IMessageContext>({
  success: (_) => {
    return;
  },
  failure: (_) => {
    return;
  },
});

export default MessageContext;
