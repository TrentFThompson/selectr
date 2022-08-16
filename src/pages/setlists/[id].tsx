//
//  File:         [id].tsx
//  Description:  Exports the /setlists/[id] page of the application
//

// Installed imports
import type { NextPage, GetServerSidePropsContext } from "next";
import { Center, Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

// Custom imports
import handleSSPError from "@/utils/getServerSideProps/handleSSPError";
import SetlistApi from "@/api/setlists";
import ISetlist from "@/interfaces/Setlist";
import ITrack from "@/interfaces/Track";
import TracksApi from "@/api/tracks";
import Header from "@/components/Page/Header";
import RemoveTrack from "@/components/Track/RemoveTrack";
import { useMessage } from "@/context/message-context";
import authenticate from "@/utils/getServerSideProps/authenticate";
import { useAuth } from "@/context/auth-context";

// Props
interface IProps {
  setlist: ISetlist;
  tracks: ITrack[];
}

//
//  Component:    ID
//  Description:  /setlists/[id] page
//
const ID: NextPage<IProps> = ({ setlist, tracks }: IProps) => {
  const [trackState, setTrackState] = useState<ITrack[]>(tracks);
  const { success } = useMessage();
  const { authRequest } = useAuth();

  //
  //  Function:     onClick
  //  Description:  handles removing a track and reacting via UI
  //  Params:       id: string - the id of the track to remove
  //  Returns:      n/a
  //
  async function onClick(id: string) {
    await authRequest(async (token: string) => {
      // Make request to remove the track
      await TracksApi.remove(setlist.id, id, token);

      // Remove the track from state and show a success message
      setTrackState((prevState) => prevState.filter((p) => p.id !== id));
      success("Track removed successfully.");
    });
  }

  return (
    <>
      <Header />
      <Center flexDirection={"column"}>
        <Heading>{setlist.name}</Heading>
        <Flex flexDirection={"column"}>
          {trackState.map((t) => (
            <div key={t.id}>
              <Text>{`${t.artist} - ${t.album} - ${t.name}`}</Text>
              <RemoveTrack onClick={onClick} track={t} />
            </div>
          ))}
        </Flex>
      </Center>
    </>
  );
};

//
//  Function:     getServerSideProps
//  Description:  get the setlist information and tracks for the page
//  Params:       context: GetServerSidePropsContext
//  Returns:      Object
//
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await handleSSPError(async () => {
    // Authenticate the user on this page
    const token = await authenticate(context);

    // Get the id of the requested album
    const { id } = context.query;

    // TODO: Find a better way to deal with array param issues
    if (!id || Array.isArray(id)) {
      throw new Error();
    }

    return {
      props: {
        setlist: await SetlistApi.findOne(id, token),
        tracks: await TracksApi.findAll(id),
      },
    };
  });
}

export default ID;
