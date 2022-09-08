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
      p={"25px"}
      bgColor={"brand"}
      w="full"
      height="100px"
      alignItems={"center"}
    >
      <Flex width="100%" justifyContent="space-between">
        <Flex width={"40%"}>
          <Links />
        </Flex>
        <Flex width={"15%"} alignItems="end" justifyContent="space-around">
          <NotificationBell />
          <Button bg={"white"} onClick={onClick}>
            Logout
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

function Links() {
  return (
    <Flex
      color={"white"}
      width={"100%"}
      flexDirection={"row"}
      justify="space-around"
    >
      <Link href={"/"}>
        <a>
          <Heading>Selectr</Heading>
        </a>
      </Link>
      <Flex width={"100%"} pt="4" justify={"space-around"}>
        <Link href={"/albums"}>
          <a>
            <Text as="u">Albums</Text>
          </a>
        </Link>
        <Link href={"/setlists"}>
          <a>
            <Text as="u">Setlists</Text>
          </a>
        </Link>
      </Flex>
    </Flex>
  );
}
