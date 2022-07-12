//
//  File:         error.tsx
//  Description:  Exports the /error page of the application
//

// Installed imports
import type { NextPage } from "next";

// Custom Imports
import Header from "@/components/Page/Header";

//
//  Component:    Error
//  Description:  Error page of the system
//
const Error: NextPage = () => {
  return (
    <>
      <Header />
      Sorry something has gone wrong
    </>
  );
};

export default Error;
