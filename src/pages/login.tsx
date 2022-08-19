//
//  File:         login.tsx
//  Description:  Exports the /login page of the application
//

// Installed imports
import type { GetServerSidePropsContext, NextPage } from "next";
import { Center } from "@chakra-ui/react";

// Custom imports
import LoginForm from "@/components/Auth/LoginForm";
import authenticate from "@/utils/getServerSideProps/authenticate";

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

//
// Function:    getServerSideProps
// Description: Fetches the initial data for this page
// Parameters:  context: GetServerSidePropsContext - the context of the page
// Returns:     default props
//
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // If authentication works then we want to go to the index page
  // Otherwise continue to login
  try {
    await authenticate(context);
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  } catch {
    return {
      props: {},
    };
  }
}

export default Login;
