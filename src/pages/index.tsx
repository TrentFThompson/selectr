//
//  File:         pages/index.tsx
//  Description:  Exports the / page of the application
//

// Installed imports
import type { NextPage } from "next";

// Custom imports
import Search from "@/components/Search";
import Header from "@/components/Page/Header";
import { Center, Heading, Text } from "@chakra-ui/react";
import AlbumSearchResult from "@/components/Search/SearchResults/AlbumSearchResult";

// For testing purposes (to be moved later)
import axios from "axios";
import { apiURL } from "@/utils/url";

async function searchAlbums(search: string) {
  const { data } = await axios.get(`${apiURL}/lastfm/albums`, {
    params: {
      search,
    },
  });

  return data;
}

//
//  Component:    Home
//  Description:  Index page of the system
//
const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Center pt="10" flexDirection={"column"}>
        <Heading>Album Search</Heading>
        <Text pb="5">Search for albums to begin adding to your setlists.</Text>
        <Search
          search={searchAlbums}
          SearchResult={AlbumSearchResult}
          placeholder="e.g. Warren Zevon"
        />
      </Center>
    </>
  );
};

export default Home;
