//
//  File:         handleSSPError.tsx
//  Description:  Exports the method for wrapping and handling
//                getServerSideProps errors
//

// Installed imports
import { SSPAuthError } from "./errors";

//
// Function:    handleSSPError
// Description: Handles an error with getServerSideProps
// Parameters:  callback: Function - the getServerSideProps "body"
//              i.e. what you want to happen in gssp
// Returns:     props from the callback OR a redirect on error
//
export default async function handleSSPError(callback: Function) {
  try {
    return await callback();
  } catch (error: any) {
    if (error instanceof SSPAuthError) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }
    return {
      redirect: {
        permanent: false,
        destination: "/error",
      },
    };
  }
}
