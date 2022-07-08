//
//  File:         Album.ts
//  Description:  Exports the interface for an Album object
//

// Custom imports
import ITrack from "./Track";

export default interface IAlbum {
  name: string;
  artist: string;
  mbid: string;
  tracks: { name: string; rank: number }[];
  image: string;
}
