//
//  File:         request.tsx
//  Description:  Exports the setlists/id/request page of the application
//

// Installed imports
import type { GetServerSidePropsContext, NextPage } from "next";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useState } from "react";

// Custom imports
import ITrack from "@/interfaces/Track";
import TracksApi from "@/api/tracks";
import handleSSPError from "@/utils/getServerSideProps/handleSSPError";
import { useMessage } from "@/context/message-context";
import RequestApi from "@/api/requests";
import SetlistApi from "@/api/setlists";
import ISetlist from "@/interfaces/Setlist";

// Props interface
interface IProps {
  initialResults: ITrack[];
  setlist: ISetlist;
}

//
//  Component:    Request
//  Description:  Page for users to make requests
//
const Request: NextPage<IProps> = ({ initialResults = [], setlist }) => {
  // Hooks
  const router = useRouter();
  const { failure } = useMessage();

  // Page Id
  const { id } = router.query;

  // State
  const [results, setResults] = useState<ITrack[]>(initialResults);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("name");

  async function _setSearchBy(searchBy: string) {
    try {
      setSearchBy(searchBy);
      setPage(1);
      setResults(await TracksApi.search(id as string, search, 1, searchBy));
    } catch {
      failure("Something went wrong. Try again later.");
    }
  }

  //
  // Function:    _setSearch
  // Description: Sets the search string and searches for new results
  // Parameters:  search: string - the new string to search by
  // Returns:     N/A
  //
  async function _setSearch(search: string) {
    try {
      setSearch(search);
      setPage(1);
      setResults(await TracksApi.search(id as string, search, 1, searchBy));
    } catch {
      failure("Something went wrong. Try again later.");
    }
  }

  //
  // Function:    _setPage
  // Description: Sets the page and searches for new results based on the page number
  // Parameters:  page: number - the number to change the page to
  // Returns:     N/A
  //
  async function _setPage(page: number) {
    try {
      setPage(page);
      setResults(await TracksApi.search(id as string, search, page, searchBy));
    } catch {
      failure("Something went wrong. Try again later.");
    }
  }

  return (
    <>
      <Header />
      <Flex width={"100%"} alignItems="center" flexDirection={"column"}>
        <Flex
          maxWidth="625px"
          width={"100%"}
          pt="20px"
          flexDirection={"column"}
          alignItems={"center"}
          pl="5px"
          pr={"5px"}
        >
          <SearchBy value={searchBy} onChange={_setSearchBy} />
          <Search onChange={_setSearch} />
          <Results setlist={setlist} results={results} />
          <Pagination
            onClick={_setPage}
            page={page}
            lastPage={results.length < 10}
          />
        </Flex>
      </Flex>
    </>
  );
};

//
//  Component:    SearchBy
//  Description:  Change the search by option for the request page
//
function SearchBy({ onChange, value }: { onChange: Function; value: string }) {
  return (
    <Flex width={"100%"} maxW="310px" mb="10px" alignSelf={"baseline"}>
      <Text alignSelf={"center"} pr="0px" width="80px">
        Sort By:
      </Text>
      <Select
        value={value}
        onChange={async (e) => await onChange(e.target.value)}
        pl="0px"
      >
        <option id="album" value="album">
          Album
        </option>
        <option id="artist" value="artist">
          Artist
        </option>
        <option id="name" value="name">
          Song
        </option>
      </Select>
    </Flex>
  );
}

//
//  Component:    RequestModal
//  Description:  Handles requesting a song in a modal
//
function RequestModal({
  track,
  setlist,
}: {
  track: ITrack;
  setlist: ISetlist;
}) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const { success, failure } = useMessage();

  function _onClose() {
    setError(false);
    setName("");
    onClose();
  }

  async function onSubmit(name: string) {
    if (name.length === 0) {
      setError(true);
    } else {
      try {
        await RequestApi.create({
          uid: setlist.uid,
          name,
          artist: track.artist,
          album: track.album,
          title: track.name,
        });
        success("Thanks for your request!");
      } catch {
        failure("Something went wrong. Please try again later.");
      }

      setError(false);
      _onClose();
    }
  }

  return (
    <>
      <Button bg="brand" color={"white"} onClick={onOpen}>
        Request
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`Request ${track.name} by ${track.artist}?`}</ModalHeader>
          <ModalBody>
            <FormControl isInvalid={error}>
              <FormLabel>Please enter your name:</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
              <FormErrorMessage>Name is required.</FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => onSubmit(name)} color="white" bg="brand">
              Confirm
            </Button>
            <Button onClick={_onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

// TODO: Break page components into component files

//
//  Component:    Pagination
//  Description:  Pagination for the song request page
//
function Pagination({
  page,
  lastPage,
  onClick,
}: {
  page: number;
  lastPage: boolean;
  onClick: Function;
}) {
  return (
    <Flex width={"100px"} justifyContent="space-around" mt={"10px"} mb={"10px"}>
      <IconButton
        bgColor={"brand"}
        aria-label="previous"
        icon={<ChevronLeftIcon />}
        color="white"
        disabled={page === 1}
        onClick={() => onClick(page - 1)}
      />
      <IconButton
        bgColor={"brand"}
        aria-label="next"
        color={"white"}
        icon={<ChevronRightIcon />}
        disabled={lastPage}
        onClick={() => onClick(page + 1)}
      />
    </Flex>
  );
}

//
//  Component:    Search
//  Description:  Search input for the song request page
//
function Search({ onChange }: { onChange: Function }) {
  return (
    <Input placeholder="Search" onChange={(e) => onChange(e.target.value)} />
  );
}

//
//  Component:    Results
//  Description:  Results display for the song request page
//
function Results({
  results,
  setlist,
}: {
  results: ITrack[];
  setlist: ISetlist;
}) {
  return (
    <Flex
      flexDirection={"column"}
      width="100%"
      justifyContent="center"
      pt={"10px"}
    >
      {results.map((r: ITrack) => (
        <Result key={r.id} result={r} setlist={setlist} />
      ))}
    </Flex>
  );
}

//
//  Component:    Result
//  Description:  Individual result display for the song request page
//
function Result({ result, setlist }: { result: ITrack; setlist: ISetlist }) {
  return (
    <Flex
      boxShadow={"md"}
      borderRadius={"md"}
      width={"100%"}
      height="80px"
      mt="5px"
      pr={"5px"}
      justifyContent="space-between"
      flexDirection={"row"}
    >
      <Flex>
        <Image
          borderRadius={"md"}
          height={"100%"}
          src={result.image || "/default.png"}
        />

        {/* Text section */}
        <Flex
          overflow={"hidden"}
          pl={"10px"}
          height={"100%"}
          flexDirection={"column"}
          pt={["5px", "10px"]}
        >
          <Text fontSize={[11, 13, 15]}>
            {result.artist} - {result.name}
          </Text>
          <Text opacity={"70%"} pt={"5px"} fontSize={[11, 13, 15]}>
            {result.album}
          </Text>
        </Flex>
      </Flex>

      {/* Request button section */}
      <Flex
        height={"100%"}
        width="25%"
        alignItems="center"
        justifyContent={"end"}
        alignSelf={"end"}
        ml="10px"
      >
        <RequestModal setlist={setlist} track={result} />
      </Flex>
    </Flex>
  );
}

//
//  Component:    Header
//  Description:  Header for the song request page
//
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
//  Function:     getServerSideProps
//  Description:  get the initial tracks for the request page
//  Params:       context: GetServerSidePropsContext
//  Returns:      Object
//
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await handleSSPError(async () => {
    // TODO: Verify album exists and route is valid

    // Get the id of the requested album
    const { id } = context.query;

    // TODO: Find a better way to deal with array param issues
    if (!id || Array.isArray(id)) {
      throw new Error();
    }

    return {
      props: {
        initialResults: await TracksApi.search(id),
        setlist: await SetlistApi.findOne(id),
      },
    };
  });
}

export default Request;
