//
//  File:         index.tsx
//  Description:  Exports the / page of the application
//

// Installed imports
import type { NextPage } from "next";

// Custom imports
import Search from "@/components/Search";
import Header from "@/components/Page/Header";
import { Center, Heading, Text } from "@chakra-ui/react";

//
//  Component:    Home
//  Description:  Index page of the system
//
const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Center pt="10" flexDirection={"column"}>
        <Heading>Album Search</Heading>
        <Text pb="5">
          Search for albums to begin adding to your collection.
        </Text>
        <Search />
      </Center>
    </>
  );
};

export default Home;
