//
//  File:         handleSSPError.tsx
//  Description:  Exports the method for wrapping and handling
//                getServerSideProps errors
//

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
    // Evaluate errors here (for example an auth error)
    // And redirect if necessary
    // but for now default redirect (no specific errors specified)
    return {
      redirect: {
        permanent: false,
        destination: "/error",
      },
    };
  }
}
