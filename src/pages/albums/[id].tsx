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
import AlbumImage from "@/components/Album/AlbumImage";
import TrackList from "@/components/Album/TrackList";

// Props
interface IProps {
  album: IAlbum;
}

//
//  Component:    ID
//  Description:  /albums/[id] page
//
const ID: NextPage<IProps> = ({ album }: IProps) => {
  return (
    <>
      <Header />
      <Heading>{`${album.artist} - ${album.name}`}</Heading>
      <AlbumImage image={album.image} />
      <TrackList tracks={album.tracks} />
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
      },
    };
  });
}

export default ID;
