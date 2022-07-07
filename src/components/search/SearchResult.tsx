//
//  File:         SearchResult.tsx
//  Description:  Export the SearchResult component
//

// Installed imports
import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";

//
//  Component:    SearchResult
//  Description:  Displays a search result
//
export default function SearchResult({
  title,
  subtitle,
  mbid,
}: {
  title: string;
  subtitle: string;
  mbid: string;
}) {
  return (
    <Link href={`/albums/${mbid}`}>
      <Box cursor={"pointer"} boxShadow={"md"} borderRadius={"md"} p="1" pl="2">
        <Text>{title}</Text>
        <Text opacity={"70%"}>{subtitle}</Text>
      </Box>
    </Link>
  );
}
