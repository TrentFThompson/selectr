//
//  File:         signup.ts
//  Description:  Exports the zod schema for signup
//

// Installed imports
import { z } from "zod";

// Setlist creation request schema
const signup = z
  .object({
    displayName: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    passwordConfirmation: z.string(),
  })
  .strict()
  .refine(
    ({ password, passwordConfirmation }) => password === passwordConfirmation,
    "Passwords don't match"
  );

export { signup };
export default { signup };
