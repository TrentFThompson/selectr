//
//  File:         SearchResult.tsx
//  Description:  Export the SearchResult component
//

// Installed imports
import { Box, Text } from "@chakra-ui/react";

//
//  Component:    SearchResult
//  Description:  Displays a search result
//
export default function SearchResult({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <Box boxShadow={"md"} borderRadius={"md"} p="1" pl="2">
      <Text>{title}</Text>
      <Text opacity={"70%"}>{subtitle}</Text>
    </Box>
  );
}
