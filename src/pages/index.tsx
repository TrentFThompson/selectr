//
//  File:         pages/index.tsx
//  Description:  Exports the / page of the application
//

// Installed imports
import type { GetServerSidePropsContext, NextPage } from "next";
import { Center, Flex, Heading, Text } from "@chakra-ui/react";

// Custom imports
import Header from "@/components/Page/Header";
import handleSSPError from "@/utils/getServerSideProps/handleSSPError";
import authenticate from "@/utils/getServerSideProps/authenticate";
import { useRequests } from "@/context/request-context";

//
//  Component:    Home
//  Description:  Index page of the system
//
const Home: NextPage = () => {
  const { requests } = useRequests();

  return (
    <>
      <Header />
      <Center pt="10" width={"100%"} flexDirection={"column"}>
        <Heading mb="10px">Requests</Heading>
        {requests.map((r) => {
          return (
            <Text
              textAlign={"center"}
              m="10px"
            >{`${r.name} has requested: ${r.artist} - ${r.album} - ${r.title}`}</Text>
          );
        })}
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
