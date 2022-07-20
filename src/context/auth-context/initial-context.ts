//
//  File:         initial-context.ts
//  Description:  Exports the initial contex of the auth system
//

// Installed imports
import { createContext } from "react";

// Custom imports
import IUser from "@/interfaces/User";

// Define the context for the auth system
interface IAuthContext {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  user: IUser | null;
  authRequest: (request: Function) => Promise<any>;
}

// Create the initial auth context
const AuthContext = createContext<IAuthContext>({
  login: async (_: string, __: string) => {
    return;
  },
  logout: async () => {
    return;
  },
  user: null,
  authRequest: async (_: Function) => {
    return;
  },
});

export default AuthContext;
