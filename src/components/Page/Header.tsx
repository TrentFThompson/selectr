//
//  File:         Header.tsx
//  Description:  Export the Header component
//

// Installed imports
import { Box, Center, Heading, Flex } from "@chakra-ui/react";
import Link from "next/link";

//
//  Component:    Header
//  Description:  Header for webpages (TODO: design properly, this is only temporary)
//
export default function Header() {
  return (
    <Box bgColor={"gray"} w="full" h="28">
      <Center>
        <Heading>Selectr</Heading>
      </Center>
      <Box w="container.sm">
        <Flex flexDirection={"row"} justify="space-around">
          <Link href={"/"}>
            <a>Home</a>
          </Link>
          <Link href={"/albums"}>
            <a>Albums</a>
          </Link>
          <Link href={"/setlists"}>
            <a>Setlists</a>
          </Link>
        </Flex>
      </Box>
    </Box>
  );
}
