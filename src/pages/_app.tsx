//
//  File: _app.tsx
//  Description: Exports the entrypoint to the application
//

// Installed imports
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

//
//  Component:    MyApp
//  Description:  Entrypoint to the system
//
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
