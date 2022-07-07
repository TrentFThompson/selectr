//
//  File:         Header.tsx
//  Description:  Export the Header component
//

// Installed imports
import { Box, Center, Heading } from "@chakra-ui/react";

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
    </Box>
  );
}
