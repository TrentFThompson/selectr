//
//  File:         AlbumSearchResult.tsx
//  Description:  Exports the AlbumSearchResult component
//

// Installed imports
import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";

// Custom imports
import IAlbum from "@/interfaces/Album";

// Component props
interface IProps {
  result: IAlbum;
}

//
//  Component:    AlbumSearchResult
//  Description:  Displays a search result of an album list
//
export default function AlbumSearchResult({ result }: IProps) {
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
