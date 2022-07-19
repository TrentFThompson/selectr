//
//  File:         signup.tsx
//  Description:  Exports the /signup page of the application
//

// Installed imports
import type { NextPage } from "next";
import { Center } from "@chakra-ui/react";

// Custom imports
import SignupForm from "@/components/Auth/SignupForm";

//
//  Component:    Signup
//  Description:  Signup page of the system
//
const Signup: NextPage = () => {
  return (
    <Center mt={"12"}>
      <SignupForm />
    </Center>
  );
};

export default Signup;
