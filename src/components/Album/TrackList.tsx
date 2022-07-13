//
//  File:         TrackList.tsx
//  Description:  Exports the album tracklist component
//

// Installed imports
import { Text } from "@chakra-ui/react";

// Custom imports
import IAlbumTrack from "@/interfaces/AlbumTrack";

// Prop Definition
interface IProps {
  tracks: IAlbumTrack[];
}

//
//  Component:    TrackList
//  Description:  Shows a list of album tracks
//
export default function TrackList({ tracks }: IProps) {
  if (!tracks) {
    return <Text>Track list not available.</Text>;
  }

  return (
    <>
      {tracks.map((t) => {
        return (
          <div key={`${t.name}-${t.rank}`}>
            <Text>{`${t.rank}. ${t.name}`}</Text>
          </div>
        );
      })}
    </>
  );
}
