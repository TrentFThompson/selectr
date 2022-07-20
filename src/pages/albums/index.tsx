//
//  File:         albums/index.tsx
//  Description:  Exports the albums/ page of the application
//

// Installed imports
import type { GetServerSidePropsContext, NextPage } from "next";
import { Center, Heading, Text } from "@chakra-ui/react";

// Custom imports
import Search from "@/components/Search";
import Header from "@/components/Page/Header";
import AlbumSearchResult from "@/components/Search/SearchResults/AlbumSearchResult";
import AlbumApi from "@/api/albums";
import IAlbum from "@/interfaces/Album";
import handleSSPError from "@/utils/getServerSideProps/handleSSPError";
import authenticate from "@/utils/getServerSideProps/authenticate";
import { useAuth } from "@/context/auth-context";

//
//  Component:    Albums
//  Description:  Album search page of the system
//
const Albums: NextPage = () => {
  const { authRequest } = useAuth();

  //
  // Function:    search
  // Description: Describes how the frontend should react
  //              if albums are found, or if there is an error
  // Parameters:  value: string - the value to search with
  // Returns:     array of albums or empty on error
  //
  async function search(value: string) {
    return await authRequest(async (token: string) => {
      return await AlbumApi.search(value, token);
    });
  }

  return (
    <>
      <Header />
      <Center pt="10" flexDirection={"column"}>
        <Heading>Album Search</Heading>
        <Text pb="5">Search for albums to begin adding to your setlists.</Text>
        <Search<IAlbum>
          search={search}
          SearchResult={AlbumSearchResult}
          placeholder="e.g. Warren Zevon"
        />
      </Center>
    </>
  );
};

//
//  Function:     getServerSideProps
//  Description:  authenticate the user can see this page
//  Params:       context: GetServerSidePropsContext
//  Returns:      Object
//
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await handleSSPError(async () => {
    // Authenticate the user
    await authenticate(context);
    return {
      props: {},
    };
  });
}

export default Albums;
