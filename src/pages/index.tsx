//
//  File: index.tsx
//  Description: Exports the / page of the application
//

// Installed imports
import type { NextPage } from "next";

// Custom imports
import Search from "@/components/search";

//
//  Component:    Home
//  Description:  Index page of the system
//
const Home: NextPage = () => {
  return (
    <>
      <Search />
    </>
  );
};

export default Home;
