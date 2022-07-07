//
//  File:         setlists.tsx
//  Description:  Exports the /setlists page of the application
//

// Installed imports
import type { NextPage } from "next";

// Custom imports
import Header from "@/components/Page/Header";
import { Center, Heading, Text } from "@chakra-ui/react";

//
//  Component:    Setlists
//  Description:  Setlist management page
//
const Setlists: NextPage = () => {
  return (
    <>
      <Header />
      <Center pt="10" flexDirection={"column"}>
        <Heading>Setlists</Heading>
        <Text pb="5">Manage your setlists.</Text>
      </Center>
    </>
  );
};

export default Setlists;
