//
//  File:         signup.ts
//  Description:  Export the album sign up api function

// Installed imports
import axios from "axios";

// Custom imports
import { apiURL } from "@/utils/url";

//
// Function:    signup
// Description: Sign up with email and password
// Parameters:  displayName: string - the name of the user
//              email: string - the email of the user
//              password: string - the password of the user
//              passwordConfirmation - the matching password
// Returns:     the newly created user
//
export default async function search(
  displayName: string,
  email: string,
  password: string,
  passwordConfirmation: string
) {
  try {
    const { data } = await axios.post(`${apiURL}/auth/signup`, {
      displayName,
      email,
      password,
      passwordConfirmation,
    });
    return data;
  } catch {
    // error to display if something goes wrong
    throw new Error("Server error. Try again later.");
  }
}
