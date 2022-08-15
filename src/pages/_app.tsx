//
//  File:         _app.tsx
//  Description:  Exports the entrypoint to the application
//

// Installed imports
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// Custom imports
import { MessageProvider } from "@/context/message-context";
import { AuthProvider } from "@/context/auth-context";
import { RequestProvider } from "@/context/request-context";

// Define theme
// Colors: https://coolors.co/16bac5-5fbff9-efe9f4-171d1c-5863f8
const theme = extendTheme({
  colors: {
    brand: "#5FBFF9",
    logo: "white",
    accent: "#16BAC5",
  },
});

//
//  Component:    MyApp
//  Description:  Entrypoint to the system
//
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <MessageProvider>
        <AuthProvider>
          <RequestProvider>
            <Component {...pageProps} />
          </RequestProvider>
        </AuthProvider>
      </MessageProvider>
    </ChakraProvider>
  );
}

export default MyApp;
