//
//  File:         SetlistList.tsx
//  Description:  Exports the Setlistlist component
//

// Installed imports
import Link from "next/link";

// Custom imports
import ISetlist from "@/interfaces/Setlist";
import RemoveSetlist from "@/components/Setlist/RemoveSetlist";

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
            <RemoveSetlist setlist={s} onClick={onRemove} />
          </>
        );
      })}
    </>
  );
}
