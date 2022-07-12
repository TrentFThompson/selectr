//
//  File:         pages/index.tsx
//  Description:  Exports the / page of the application
//

// Installed imports
import type { NextPage } from "next";
import { Center, Heading, Text } from "@chakra-ui/react";

// Custom imports
import Search from "@/components/Search";
import Header from "@/components/Page/Header";
import AlbumSearchResult from "@/components/Search/SearchResults/AlbumSearchResult";
import AlbumApi from "@/api/albums";
import { useMessage } from "@/context/message-context";

//
//  Component:    Home
//  Description:  Index page of the system
//
const Home: NextPage = () => {
  const { failure } = useMessage();

  //
  // Function:    search
  // Description: Describes how the frontend should react
  //              if albums are found, or if there is an error
  // Parameters:  value: string - the value to search with
  // Returns:     array of albums or empty on error
  //
  async function search(value: string) {
    try {
      return await AlbumApi.search(value);
    } catch (error: any) {
      failure(error.message);
      return [];
    }
  }

  return (
    <>
      <Header />
      <Center pt="10" flexDirection={"column"}>
        <Heading>Album Search</Heading>
        <Text pb="5">Search for albums to begin adding to your setlists.</Text>
        <Search
          search={search}
          SearchResult={AlbumSearchResult}
          placeholder="e.g. Warren Zevon"
        />
      </Center>
    </>
  );
};

export default Home;
