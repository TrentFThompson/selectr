//
//  File:         [id].tsx
//  Description:  Exports the /setlists/[id] page of the application
//

// Installed imports
import type { NextPage, GetServerSidePropsContext } from "next";
import { Center, Flex, Heading } from "@chakra-ui/react";

// Custom imports
import handleSSPError from "@/utils/handleSSPError";
import SetlistApi from "@/api/setlists";
import ISetlist from "@/interfaces/Setlist";
import ITrack from "@/interfaces/Track";
import TracksApi from "@/api/tracks";
import Header from "@/components/Page/Header";

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
  return (
    <>
      <Header />
      <Center flexDirection={"column"}>
        <Heading>{setlist.name}</Heading>
        <Flex flexDirection={"column"}>
          {tracks.map((t) => (
            <div>{`${t.artist} - ${t.name}`}</div>
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
    // Get the id of the requested album
    const { id } = context.query;

    // TODO: Find a better way to deal with array param issues
    if (!id || Array.isArray(id)) {
      throw new Error();
    }

    return {
      props: {
        setlist: await SetlistApi.findOne(id),
        tracks: await TracksApi.findAll(id),
      },
    };
  });
}

export default ID;
