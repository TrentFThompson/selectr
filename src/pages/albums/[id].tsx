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
import handleSSPError from "@/utils/handleSSPError";
import AlbumAPi from "@/api/albums";
import SetlistApi from "@/api/setlists";
import AlbumImage from "@/components/Album/AlbumImage";
import TrackList from "@/components/Album/TrackList";
import ISetlist from "@/interfaces/Setlist";
import AddToSetlist from "@/components/Setlist/AddToSetlist";
import { useMessage } from "@/context/message-context";

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
  const { failure, success } = useMessage();

  //
  // Function:    onSubmit
  // Description: Handles how the ui should react when adding an albums
  //              tracks to a setlist
  // Parameters:  setlistId: string - the id of the setlist to add to
  //              albumId: string - the id of the album to add
  // Returns:     n/a
  //
  async function onSubmit(setlistId: string, albumId: string) {
    try {
      await SetlistApi.addAlbum(setlistId, albumId);
      success("Album tracks successfully added to setlist.");
    } catch (error: any) {
      failure(error.message);
    }
  }

  return (
    <>
      <Header />
      <Heading>{`${album.artist} - ${album.name}`}</Heading>
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

    return {
      props: {
        album: await AlbumAPi.findOne(id),
        setlists: await SetlistApi.findAll(),
      },
    };
  });
}

export default ID;
