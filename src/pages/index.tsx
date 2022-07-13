//
//  File:         pages/index.tsx
//  Description:  Exports the / page of the application
//

// Installed imports
import type { NextPage } from "next";
import { Center, Heading } from "@chakra-ui/react";

// Custom imports
import Header from "@/components/Page/Header";

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

export default Home;
