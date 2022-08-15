//
//  File:         request.tsx
//  Description:  Exports the setlists/id/request page of the application
//

// Installed imports
import type { GetServerSidePropsContext, NextPage } from "next";
import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";

// Custom imports
import handleSSPError from "@/utils/getServerSideProps/handleSSPError";
import ITrack from "@/interfaces/Track";

// Props interface
interface IProps {}

const mockResults: ITrack[] = [
  {
    artist: "Warren Zevon",
    album: "Excitable Boy",
    name: "Roland the Headless Thompson Gunner",
  },
];

//
//  Component:    Request
//  Description:  Page for users to make requests
//
const Request: NextPage<IProps> = ({}: IProps) => {
  return (
    <>
      <Header />
      <Results results={mockResults} />
    </>
  );
};

// Results
function Results({ results }: { results: ITrack[] }) {
  return (
    <Flex
      flexDirection={"column"}
      width="100%"
      justifyContent="center"
      pt={"5px"}
      pl="5px"
      pr={"5px"}
    >
      <Result result={results[0]} />
      <Result result={results[0]} />
      <Result result={results[0]} />
      <Result result={results[0]} />
      <Result result={results[0]} />
      <Result result={results[0]} />
      <Result result={results[0]} />
      <Result result={results[0]} />
      <Result result={results[0]} />
      <Result result={results[0]} />
    </Flex>
  );
}

function Result({ result }: { result: ITrack }) {
  return (
    <Flex
      boxShadow={"md"}
      borderRadius={"md"}
      width={"100%"}
      height="85px"
      mt="5px"
      pr={"5px"}
      alignContent="space-between"
    >
      <Image borderRadius={"md"} height={"100%"} src="/testcover.jpg" />
      <Flex
        overflow={"hidden"}
        pl={"5px"}
        height={"100%"}
        flexDirection={"column"}
        pt="5px"
      >
        <Text fontSize={"12px"}>
          {result.artist} - {result.name}
        </Text>
        <Text pt={"5px"} fontSize={"12px"}>
          {result.album}
        </Text>
      </Flex>
      <Flex height={"100%"} alignItems="center">
        <Button textColor={"white"} height={"33%"} bgColor={"accent"}>
          Request
        </Button>
      </Flex>
    </Flex>
  );
}

// Header Section
function Header() {
  return (
    <Flex
      width="100%"
      backgroundColor="brand"
      height="100px"
      justifyContent="center"
    >
      <Flex
        height="100%"
        width={"80%"}
        alignItems={"center"}
        justifyContent="center"
      >
        <Heading color={"white"}>Selectr</Heading>
      </Flex>
    </Flex>
  );
}

//
// Function:    getServerSideProps
// Description: Fetches the initial data for this page
// Parameters:  context: GetServerSidePropsContext - the context of the page
// Returns:
//
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Wrap our server side prop body with the error handler
  return await handleSSPError(async () => {
    // Todo: Make sure to verify the id specified is valid, otherwise 404

    return {
      props: {},
    };
  });
}

export default Request;
