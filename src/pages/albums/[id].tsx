//
//  File:         [id].tsx
//  Description:  Exports the /albums/[id] page of the application
//

// Installed imports
import type { NextPage, GetServerSidePropsContext } from "next";
import axios from "axios";
import { Heading, Text, Image, Box } from "@chakra-ui/react";

// Custom imports
import { apiURL } from "@/utils/url";
import IAlbum from "@/interfaces/Album";
import IAlbumTrack from "@/interfaces/AlbumTrack";
import Header from "@/components/Page/Header";

// Props
interface IProps {
  error?: string;
  album?: IAlbum;
}

//
//  Component:    ID
//  Description:  /albums/[id] page
//
const ID: NextPage = ({ error, album }: IProps) => {
  // TODO: Implement better client-side error handling/display
  if (error) {
    console.log(error);
    return <>Something went wrong</>;
  }

  if (album) {
    return (
      <>
        <Header />
        <Heading>{`${album.artist} - ${album.name}`}</Heading>
        <AlbumImage image={album.image} />
        <TrackList tracks={album.tracks} />
      </>
    );
  } else {
    return <Text>Album info not available.</Text>;
  }
};

function AlbumImage({ image }: { image: string | undefined }) {
  if (!image) {
    return <Text>Image not available.</Text>;
  }

  return (
    <Box boxSize={"sm"}>
      <Image src={image} alt="" />
    </Box>
  );
}

function TrackList({ tracks }: { tracks: IAlbumTrack[] | undefined }) {
  if (!tracks) {
    return <Text>Track list not available.</Text>;
  }

  return (
    <>
      {tracks.map((t) => {
        return (
          <div key={`${t.name}-${t.rank}`}>
            <Text>{`${t.rank}. ${t.name}`}</Text>
          </div>
        );
      })}
    </>
  );
}

//
//  Function:     getServerSideProps
//  Description:  get the album information for the page
//  Params:       context: GetServerSidePropsContext
//  Returns:      Object
//
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Get the id of the requested album
  const { id } = context.query;

  // TODO: Devise better server side props error strategy
  try {
    // get the info of the album
    const response = await axios.get(`${apiURL}/lastfm/albums/info?mbid=${id}`);
    return {
      props: {
        album: response.data,
      },
    };
  } catch (error: any) {
    if (error?.response?.status === 404) {
      return {
        props: {
          error: "Album not found",
        },
      };
    } else {
      return {
        props: {
          error: "Something went wrong",
        },
      };
    }
  }
}

export default ID;
