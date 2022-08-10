//
//  File:         Header/index.tsx
//  Description:  Export the Header component
//

// Installed imports
import { Heading, Flex, Button, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

// Custom imports
import { useAuth } from "@/context/auth-context";
import NotificationBell from "./NotificationBell";

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
    <Flex
      justifyContent={"space-between"}
      p={"25px"}
      position={"relative"}
      bgColor={"gray"}
      w="full"
      h="125px"
    >
      <Flex h="100%" width={"50%"}>
        <Links />
      </Flex>
      <Flex justifyContent={"space-around"} h="100%" width="15%">
        <NotificationBell />
        <Button onClick={onClick}>Logout</Button>
      </Flex>
    </Flex>
  );
}

function Links() {
  return (
    <Flex width={"100%"} flexDirection={"row"} justify="space-around">
      <Link href={"/"}>
        <a>
          <Heading>Selectr</Heading>
        </a>
      </Link>
      <Flex width={"100%"} pt="4" justify={"space-around"}>
        <Link href={"/albums"}>
          <a>
            <Text>Albums</Text>
          </a>
        </Link>
        <Link href={"/setlists"}>
          <a>
            <Text>Setlists</Text>
          </a>
        </Link>
      </Flex>
    </Flex>
  );
}
