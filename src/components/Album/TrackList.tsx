//
//  File:         TrackList.tsx
//  Description:  Exports the album tracklist component
//

// Installed imports
import { Text } from "@chakra-ui/react";

// Custom imports
import IAlbum from "@/interfaces/Album";
import ISetlist from "@/interfaces/Setlist";
import AddToSetlist from "../Setlist/AddToSetlist";
import { useMessage } from "@/context/message-context";
import SetlistApi from "@/api/setlists";
import ITrack from "@/interfaces/Track";
import { useAuth } from "@/context/auth-context";

// Prop Definition
interface IProps {
  album: IAlbum;
  setlists: ISetlist[];
}

//
//  Component:    TrackList
//  Description:  Shows a list of album tracks
//
export default function TrackList({ album, setlists }: IProps) {
  const { success } = useMessage();
  const { authRequest } = useAuth();

  //
  // Function:    submitTrack
  // Description: Handles adding a track to a specified setlist
  // Parameters:  id: string - the id of the setlist to add to
  //              track: ITrack - the track to add to the setlist
  // Returns:     n/a
  //
  async function submitTrack(id: string, track: ITrack) {
    return await authRequest(async (token: string) => {
      await SetlistApi.addTrack(id, track, token);
      success("Successfully added track to setlist.");
    });
  }

  if (!album.tracks) {
    return <Text>Track list not available.</Text>;
  }

  return (
    <>
      {album.tracks.map((t) => {
        return (
          <div key={`${t.name}-${t.rank}`}>
            <Text>{`${t.rank}. ${t.name}`}</Text>
            <AddToSetlist<ITrack>
              setlists={setlists}
              title={`${album.artist} - ${t.name}`}
              onSubmit={submitTrack}
              payload={{
                name: t.name,
                album: album.name,
                artist: album.artist,
              }}
            />
          </div>
        );
      })}
    </>
  );
}
