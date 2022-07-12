//
//  File:         SearchResult.tsx
//  Description:  Export the SearchResult component
//

// Installed imports
import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";

import IAlbum from "@/interfaces/Album";

interface IProps {
  result: IAlbum;
}

//
//  Component:    SearchResult
//  Description:  Displays a search result
//
export default function SearchResult({ result }: IProps) {
  const { mbid, artist, name } = result;

  return (
    <Link href={`/albums/${mbid}`}>
      <Box cursor={"pointer"} boxShadow={"md"} borderRadius={"md"} p="1" pl="2">
        <Text>{name}</Text>
        <Text opacity={"70%"}>{artist}</Text>
      </Box>
    </Link>
  );
}
