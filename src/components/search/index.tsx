//
//  File:         Search/index.tsx
//  Description:  exports the Search component
//

//Installed imports
import { useState } from "react";
import { Container, Flex, Input } from "@chakra-ui/react";

// Interface for the search component props
interface IProps<T> {
  search: (search: string) => Promise<T[]>;
  SearchResult: React.FC<{ result: T }>;
  placeholder: string;
}

//
//  Component:    Search
//  Description:  A generic search component
//
export default function Search<T>({
  search,
  SearchResult,
  placeholder,
}: IProps<T>) {
  const [results, setResults] = useState<T[]>([]);

  //
  //  Function:     onChange
  //  Description:  Searches for new data when the textbox changes
  //  Params:       value: string - the search value
  //  Returns:      N/A
  //
  async function onChange(value: string) {
    setResults(await search(value));
  }

  return (
    <>
      <Container w="container.xl" flexDirection={"column"}>
        <Input
          placeholder={placeholder}
          h={"10"}
          onChange={(e) => onChange(e.target.value)}
        />
        <Flex flexDirection={"column"}>
          {results.map((r, i) => (
            <SearchResult key={i} result={r} />
          ))}
        </Flex>
      </Container>
    </>
  );
}
