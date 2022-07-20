//
//  File:         pages/index.tsx
//  Description:  Exports the / page of the application
//

// Installed imports
import type { GetServerSidePropsContext, NextPage } from "next";
import { Center, Heading } from "@chakra-ui/react";

// Custom imports
import Header from "@/components/Page/Header";
import handleSSPError from "@/utils/getServerSideProps/handleSSPError";
import authenticate from "@/utils/getServerSideProps/authenticate";

//
//  Component:    Home
//  Description:  Index page of the system
//
const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Center pt="10" flexDirection={"column"}>
        <Heading>Welcome to Selectr</Heading>
      </Center>
    </>
  );
};

//
//  Function:     getServerSideProps
//  Description:  authenticate the user can see this page
//  Params:       context: GetServerSidePropsContext
//  Returns:      Object
//
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await handleSSPError(async () => {
    // Authenticate the user
    await authenticate(context);
    return {
      props: {},
    };
  });
}

export default Home;
