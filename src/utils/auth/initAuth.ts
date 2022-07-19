//
//  File:         initAuth.ts
//  Description:  Exports the function to initialize the next-firebase-auth module
//

// Installed imports
import { init } from "next-firebase-auth";

//
//  Function:     initAuth
//  Description:  Initializes auth for the system, using the next-firebase-auth module
//  Params:       none
//  Returns:      n/a
//
export default function initAuth() {
  init({
    authPageURL: "/login",
    appPageURL: "/",
    cookies: {
      name: "Selectr-Client",
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production", // set this to false in local (non-HTTPS) development
      signed: true,
    },
    firebaseClientInitConfig: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    },
    firebaseAdminInitConfig: {
      credential: {
        privateKey: process.env.FIREBASE_PRIVATE_KEY!,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
      },
      databaseURL: "",
    },
    loginAPIEndpoint: "/api/v1/auth/login",
    logoutAPIEndpoint: "/api/v1/auth/logout",
    onVerifyTokenError: (err) => {
      console.error(err);
    },
    onTokenRefreshError: (err) => {
      console.error(err);
    },
  });
}
