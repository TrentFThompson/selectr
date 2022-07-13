//
//  File:         setlists/index.tsx
//  Description:  Exports the /setlists page of the application
//

// Installed imports
import type { GetServerSidePropsContext, NextPage } from "next";
import { Center, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

// Custom imports
import Header from "@/components/Page/Header";
import ISetlist from "@/interfaces/Setlist";
import SetlistApi from "@/api/setlists";
import handleSSPError from "@/utils/handleSSPError";
import CreateSetlist from "@/components/Setlist/CreateSetlist";

// Props interface
interface IProps {
  setlists: ISetlist[];
}

//
//  Component:    Setlists
//  Description:  Setlist management page
//
const Setlists: NextPage<IProps> = ({ setlists }: IProps) => {
  return (
    <>
      <Header />
      <Center pt="10" flexDirection={"column"}>
        <Heading>Setlists</Heading>
        <Text pb="5">Manage your setlists.</Text>
        <SetlistList setlists={setlists} />
        <CreateSetlist />
      </Center>
    </>
  );
};

//
//  Component:    SetlistList
//  Description:  Displays a list of setlits
//  TODO:         To be moved into component folder later
//
function SetlistList({ setlists }: { setlists: ISetlist[] }) {
  return (
    <>
      {setlists.map((s) => {
        return (
          <Link key={s.id} href={`/setlists/${s.id}`}>
            <a>{s.name}</a>
          </Link>
        );
      })}
    </>
  );
}

//
// Function:    getServerSideProps
// Description: Fetches the initial data for this page
// Parameters:  context: GetServerSidePropsContext - the context of the page
// Returns:     props with setlist data or redirect on error
//
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Wrap our server side prop body with the error handler
  return await handleSSPError(async () => {
    return {
      props: {
        setlists: await SetlistApi.findAll(),
      },
    };
  });
}

export default Setlists;
