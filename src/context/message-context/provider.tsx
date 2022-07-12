//
//  File:         provider.ts
//  Description:  Exports the provider component for the message
//                system
//

// Installed imports
import { useToast } from "@chakra-ui/react";

// Custom imports
import MessageContext from "./initial-contex";

// Constants
const TEN_SECONDS = 10000;
const DEFAULT_TOAST = {
  isClosable: true,
  duration: TEN_SECONDS,
};

// Props for message provider
interface IProps {
  children: JSX.Element;
}

//
// Component:   MessageProvider
// Description: Provides the message system where needed
//
function MessageProvider({ children }: IProps) {
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

export default MessageProvider;
