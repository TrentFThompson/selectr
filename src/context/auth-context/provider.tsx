//
//  File:         provider.ts
//  Description:  Exports the provider component for auth context
//

// Installed imports
import { useEffect, useState } from "react";
import cookie from "js-cookie";

// Custom imports
import IUser from "@/interfaces/User";
import { auth } from "@/lib/firebase";
import AuthContext from "./initial-context";

// Constants
const AUTH_COOKIE = process.env.AUTH_COOKIE || "token";

// Props for auth provider
interface IProps {
  children: JSX.Element;
}

//
// Component:   AuthProvider
// Description: Provides the auth system where needed
//
export default function AuthProvider({ children }: IProps) {
  const [user, setUser] = useState<IUser | null>(null);

  //
  // Function:    login
  // Description: attempts to log in a user
  // Parameters:  email: string - the user email
  //              password: string - the user password
  // Returns:     n/a
  //
  async function login(email: string, password: string) {
    await auth.signInWithEmailAndPassword(email, password);
  }

  //
  // Function:    logout
  // Description: logs out a user
  // Parameters:  none
  // Returns:     n/a
  //
  async function logout() {
    await auth.signOut();
  }

  // Use Effect for when the ID token of a user changes
  useEffect(() => {
    // When the token changes
    auth.onIdTokenChanged(async (user) => {
      if (!user) {
        // If no user, remove and set cookie
        setUser(null);
        cookie.remove(AUTH_COOKIE);
      } else {
        // If user, set user state and token cookie
        setUser({
          displayName: user.displayName || "Name not found",
          email: user.email || "Email not found",
          uid: user.uid,
        });
        cookie.set(AUTH_COOKIE, await user.getIdToken(), {
          sameSite: "Strict",
          secure: process.env.NODE_ENV === "production",
        });
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
