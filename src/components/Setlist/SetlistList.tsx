//
//  File:         SetlistList.tsx
//  Description:  Exports the Setlistlist component
//

// Installed imports
import Link from "next/link";
import { Button } from "@chakra-ui/react";

// Custom imports
import ISetlist from "@/interfaces/Setlist";

// Prop definition
interface IProps {
  setlists: ISetlist[];
  onRemove: (id: string) => void;
}

//
//  Component:    SetlistList
//  Description:  Displays a list of setlists
//
export default function SetlistList({ setlists, onRemove }: IProps) {
  return (
    <>
      {setlists.map((s) => {
        return (
          <>
            <Link key={s.id} href={`/setlists/${s.id}`}>
              <a>{s.name}</a>
            </Link>
            <Button bg={"red"} onClick={() => onRemove(s.id)}>
              Remove
            </Button>
          </>
        );
      })}
    </>
  );
}
