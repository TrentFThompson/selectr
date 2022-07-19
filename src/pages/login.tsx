//
//  File:         login.tsx
//  Description:  Exports the /login page of the application
//

// Installed imports
import type { NextPage } from "next";
import { Center } from "@chakra-ui/react";

// Custom imports
import LoginForm from "@/components/Auth/LoginForm";

//
//  Component:    Login
//  Description:  Login page of the system
//
const Login: NextPage = () => {
  return (
    <Center mt={"12"}>
      <LoginForm />
    </Center>
  );
};

export default Login;
