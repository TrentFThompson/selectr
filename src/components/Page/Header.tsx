//
//  File:         Header.tsx
//  Description:  Export the Header component
//

// Installed imports
import { Box, Center, Heading, Flex, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

// Custom imports
import { useAuth } from "@/context/auth-context";

//
//  Component:    Header
//  Description:  Header for webpages (TODO: design properly, this is only temporary)
//
export default function Header() {
  const { logout } = useAuth();
  const router = useRouter();

  //
  // Function:    onClick
  // Description: Handles logging out
  // Parameters:  none
  // Returns:     n/a
  //
  async function onClick() {
    await logout();
    router.push("/login");
  }

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
          <Button onClick={onClick}>Logout</Button>
        </Flex>
      </Box>
    </Box>
  );
}
