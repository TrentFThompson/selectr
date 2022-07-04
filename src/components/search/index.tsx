//
//  File:         index.tsx
//  Description:  exports the Search component
//

//Installed imports
import axios from "axios";
import { useState } from "react";
import { Container, Flex, Input } from "@chakra-ui/react";

//Custom imports
import { apiURL } from "@/utils/url";
import SearchResult from "./SearchResult";
import Song from "@/interfaces/Song";

//
//  Component:    Search
//  Description:  Searches for a list of songs based on lastfm
//
export default function Search() {
  const [results, setResults] = useState<Song[]>([]);

  // Searches for the data
  async function search(text: string) {
    const { data } = await axios.get(`${apiURL}/lastfm/songs`, {
      params: {
        search: text,
      },
    });

    setResults(data);
  }

  return (
    <>
      <Container w="container.xl" flexDirection={"column"}>
        <Input h={"10"} onChange={(e) => search(e.target.value)} />
        <Flex flexDirection={"column"}>
          {results.map((song) => (
            <SearchResult
              title={song.name}
              subtitle={song.artist}
              key={`${song.artist}-${song.name}`}
            />
          ))}
        </Flex>
      </Container>
    </>
  );
}
