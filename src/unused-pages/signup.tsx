//
//  File:         signup.tsx
//  Description:  Exports the /signup page of the application
//

// Installed imports
import type { GetServerSidePropsContext, NextPage } from "next";
import { Center } from "@chakra-ui/react";

// Custom imports
import SignupForm from "@/components/Auth/SignupForm";
import authenticate from "@/utils/getServerSideProps/authenticate";

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

//
// Function:    getServerSideProps
// Description: Fetches the initial data for this page
// Parameters:  context: GetServerSidePropsContext - the context of the page
// Returns:     default props
//
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // If authentication works then we want to go to the index page
  // Otherwise continue to signup
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

export default Signup;
