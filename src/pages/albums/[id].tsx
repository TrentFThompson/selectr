//
//  File:         [id].tsx
//  Description:  Exports the /albums/[id] page of the application
//

// Installed imports
import type { NextPage, GetServerSidePropsContext } from "next";
import { Heading } from "@chakra-ui/react";

// Custom imports
import IAlbum from "@/interfaces/Album";
import Header from "@/components/Page/Header";
import handleSSPError from "@/utils/getServerSideProps/handleSSPError";
import AlbumAPi from "@/api/albums";
import SetlistApi from "@/api/setlists";
import AlbumImage from "@/components/Album/AlbumImage";
import TrackList from "@/components/Album/TrackList";
import ISetlist from "@/interfaces/Setlist";
import AddToSetlist from "@/components/Setlist/AddToSetlist";
import { useMessage } from "@/context/message-context";
import authenticate from "@/utils/getServerSideProps/authenticate";
import { useAuth } from "@/context/auth-context";

// Props
interface IProps {
  album: IAlbum;
  setlists: ISetlist[];
}

//
//  Component:    ID
//  Description:  /albums/[id] page
//
const ID: NextPage<IProps> = ({ album, setlists }: IProps) => {
  const { success } = useMessage();
  const { authRequest } = useAuth();

  //
  // Function:    onSubmit
  // Description: Handles how the ui should react when adding an albums
  //              tracks to a setlist
  // Parameters:  setlistId: string - the id of the setlist to add to
  //              albumId: string - the id of the album to add
  // Returns:     n/a
  //
  async function onSubmit(setlistId: string, albumId: string) {
    return await authRequest(async (token: string) => {
      await SetlistApi.addAlbum(setlistId, albumId, token);
      success("Album tracks successfully added to setlist.");
    });
  }

  return (
    <>
      <Header />
      <Heading pt={"10"}>{`${album.artist} - ${album.name}`}</Heading>
      <AddToSetlist<string>
        onSubmit={onSubmit}
        setlists={setlists}
        payload={album.mbid}
        title={`${album.artist} - ${album.artist}`}
      />
      <AlbumImage image={album.image} />
      <TrackList album={album} setlists={setlists} />
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
  return await handleSSPError(async () => {
    // Get the id of the requested album
    const { id } = context.query;

    // TODO: Find a better way to deal with array param issues
    if (!id || Array.isArray(id)) {
      throw new Error();
    }

    // Get the token for the requests
    const token = await authenticate(context);

    return {
      props: {
        album: await AlbumAPi.findOne(id, token),
        setlists: await SetlistApi.findAll(token),
      },
    };
  });
}

export default ID;
