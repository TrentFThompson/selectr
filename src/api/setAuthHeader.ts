//
//  File:         setAuthHeader.ts
//  Description:  Exports the setAuthHeader function
//

//
// Function:    setAuthHeader
// Description: Sets an auth header for an axios request
// Parameters:  none
// Returns:     the appropriate auth headers
//
export default function setAuthHeader(token: string) {
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
}
