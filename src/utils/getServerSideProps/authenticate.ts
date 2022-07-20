//
//  File:         authenticate.ts
//  Description:  Exports the auth handler for getServerSideProps functions
//

// Installed imports
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

// Custom imports
import { SSPAuthError } from "./errors";
import { auth } from "@/lib/firebase-admin";

// Constants
const AUTH_COOKIE = process.env.AUTH_COOKIE || "token";

//
//  Function:     authenticate
//  Description:  gets the token for serversideprops functions
//  Params:       context: GetServerSidePropsContext - the context of the SSP function
//  Returns:      the parsed token
//
export default async function authenticate(context: GetServerSidePropsContext) {
  // Get token and error check
  const token = parseCookies(context)[AUTH_COOKIE];
  if (!token) {
    throw new SSPAuthError();
  }

  // Verify the token
  await verifyToken(token);

  return token;
}

//
//  Function:     verifyToken
//  Description:  verifies a token for get server side props
//  Params:       token: string - the token to verify
//  Returns:      the result of verifying the token
//
async function verifyToken(token: string) {
  try {
    return await auth.verifyIdToken(token);
  } catch {
    throw new SSPAuthError();
  }
}
