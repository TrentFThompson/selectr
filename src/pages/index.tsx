//
//  File:         index.tsx
//  Description:  Exports the / page of the application
//

// Installed imports
import type { NextPage } from "next";

// Custom imports
import Search from "@/components/Search";
import Header from "@/components/Page/Header";

//
//  Component:    Home
//  Description:  Index page of the system
//
const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Search />
    </>
  );
};

export default Home;
