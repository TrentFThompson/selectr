//
//  File:         provider.ts
//  Description:  Exports the provider component for the message
//                system
//

// Installed imports
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

// Custom imports
import MessageContext from "./initial-context";

// Constants
const TEN_SECONDS = 10000;
const DEFAULT_TOAST = {
  isClosable: false,
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
export default function MessageProvider({ children }: IProps) {
  const toast = useToast();
  const [messageState, setMessage] = useState("");

  //
  // Function:    success
  // Description: Shows a success style message
  // Parameters:  message: string - the message to show
  // Returns:     n/a
  //
  function success(message: string) {
    show(message, "success");
  }

  //
  // Function:    failure
  // Description: Shows a failure style message
  // Parameters:  message: string - the message to show
  // Returns:     n/a
  //
  function failure(message: string) {
    show(message, "error");
  }

  //
  // Function:    shouldShowMessage
  // Description: Determines if we should show a message
  //              preference is to not show same message in new toast
  // Parameters:  message: string - the message to check
  // Returns:     boolean - true if should show, false if not
  //
  function shouldShowMessage(message: string) {
    return message !== messageState;
  }

  //
  // Function:    show
  // Description: Closes existing toast and shows a new one
  // Parameters:  title: string - the message to show
  //              status: "error" | "success" - the status of the toast
  // Returns:     n/a
  //
  function show(title: string, status: "error" | "success") {
    // Check if we should show the message
    if (shouldShowMessage(title)) {
      // Close old and show new message
      toast.closeAll();
      setMessage(title);
      toast({
        ...DEFAULT_TOAST,
        title,
        status,
        // Be sure to reset message state when current closes
        onCloseComplete: () => setMessage(""),
      });
    }
  }

  return (
    <MessageContext.Provider value={{ success, failure }}>
      {children}
    </MessageContext.Provider>
  );
}
