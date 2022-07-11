//
//  File:         message-context.ts
//  Description:  Exports the functions and components required
//                to use the message display system
//

// Installed imports
import { useContext, createContext } from "react";
import { useToast } from "@chakra-ui/react";

// Constants
const TEN_SECONDS = 10000;
const DEFAULT_TOAST = {
  isClosable: true,
  duration: TEN_SECONDS,
};

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

//
// Component:   MessageProvider
// Description: Provides the message system where needed
//
function MessageProvider({ children }: any) {
  const toast = useToast();

  //
  // Function:    success
  // Description: Shows a success style message
  // Parameters:  message: string - the message to show
  // Returns:     n/a
  //
  function success(message: string) {
    toast({
      ...DEFAULT_TOAST,
      title: message,
      status: "success",
    });
  }

  //
  // Function:    failure
  // Description: Shows a failure style message
  // Parameters:  message: string - the message to show
  // Returns:     n/a
  //
  function failure(message: string) {
    toast({
      ...DEFAULT_TOAST,
      title: message,
      status: "error",
    });
  }

  return (
    <MessageContext.Provider value={{ success, failure }}>
      {children}
    </MessageContext.Provider>
  );
}

//
// Function:    useMessage
// Description: hook to use the MessageContext
// Parameters:  none
// Returns:     the message context
//
function useMessage() {
  return useContext(MessageContext);
}

export { useMessage, MessageProvider };
