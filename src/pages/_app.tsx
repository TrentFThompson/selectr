//
//  File:         _app.tsx
//  Description:  Exports the entrypoint to the application
//

// Installed imports
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

// Custom imports
import { MessageProvider } from "@/context/message-context";
import { AuthProvider } from "@/context/auth-context";

//
//  Component:    MyApp
//  Description:  Entrypoint to the system
//
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <MessageProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </MessageProvider>
    </ChakraProvider>
  );
}

export default MyApp;
