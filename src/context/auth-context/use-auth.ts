//
//  File:         use-auth.ts
//  Description:  Exports the hook to use the auth system
//

// Installed imports
import { useContext } from "react";

// Custom imports
import AuthContext from "./initial-context";

//
// Function:    useAuth
// Description: hook to use the AuthContext
// Parameters:  none
// Returns:     the auth context
//
function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
