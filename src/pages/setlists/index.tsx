//
//  File:         setlists/index.tsx
//  Description:  Exports the /setlists page of the application
//

// Installed imports
import type { GetServerSidePropsContext, NextPage } from "next";
import { Center, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

// Custom imports
import Header from "@/components/Page/Header";
import ISetlist from "@/interfaces/Setlist";
import SetlistApi from "@/api/setlists";
import handleSSPError from "@/utils/getServerSideProps/handleSSPError";
import CreateSetlist from "@/components/Setlist/CreateSetlist";
import { useMessage } from "@/context/message-context";
import SetlistList from "@/components/Setlist/SetlistList";
import authenticate from "@/utils/getServerSideProps/authenticate";
import { useAuth } from "@/context/auth-context";

// Props interface
interface IProps {
  setlists: ISetlist[];
}

//
//  Component:    Setlists
//  Description:  Setlist management page
//
const Setlists: NextPage<IProps> = ({ setlists }: IProps) => {
  const [setlistState, setSetlistState] = useState<ISetlist[]>(setlists);
  const { success } = useMessage();
  const { authRequest } = useAuth();

  //
  // Function:    onSubmit
  // Description: Describes how UI should react when the new setlist
  //              form is submitted
  // Parameters:  name: string - the name of the new setlist to add
  // Returns:     n/a
  //
  async function onSubmit(name: string) {
    await authRequest(async (token: string) => {
      const setlist = await SetlistApi.create(name, token);
      setSetlistState((prevState) => [...prevState, setlist]);
      success("New setlist created.");
    });
  }

  //
  // Function:    onRemove
  // Description: Describes how UI should react when a setlist
  //              is removed
  // Parameters:  id: string - the id of the setlist to remove
  // Returns:     n/a
  //
  async function onRemove(id: string) {
    await authRequest(async (token: string) => {
      // Remove via api and set state
      await SetlistApi.remove(id, token);
      setSetlistState((prevState) => prevState.filter((s) => s.id !== id));
      success("Setlist removed successfully.");
    });
  }

  return (
    <>
      <Header />
      <Center pt="10" flexDirection={"column"}>
        <Heading>Setlists</Heading>
        <Text pb="5">Manage your setlists.</Text>
        <SetlistList onRemove={onRemove} setlists={setlistState} />
        <CreateSetlist onSubmit={onSubmit} />
      </Center>
    </>
  );
};

//
// Function:    getServerSideProps
// Description: Fetches the initial data for this page
// Parameters:  context: GetServerSidePropsContext - the context of the page
// Returns:     props with setlist data or redirect on error
//
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Wrap our server side prop body with the error handler
  return await handleSSPError(async () => {
    // Get the user id
    const token = await authenticate(context);

    // And search for the data
    return {
      props: {
        setlists: await SetlistApi.findAll(token),
      },
    };
  });
}

export default Setlists;
