//
//  File:         [id].tsx
//  Description:  Exports the /albums/[id] page of the application
//

// Installed imports
import Header from "@/components/Page/Header";
import type { NextPage, GetServerSidePropsContext } from "next";

//
//  Component:    ID
//  Description:  /albums/[id] page
//
const ID: NextPage = () => {
  return (
    <>
      <Header />
      <div>Bababooey</div>
    </>
  );
};

//
//  Function:     getServerSideProps
//  Description:  get the album information for the page
//  Params:       context: GetServerSidePropsContext
//  Returns:      Object
//
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {},
  };
}

export default ID;
