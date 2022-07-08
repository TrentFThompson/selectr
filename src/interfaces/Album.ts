//
//  File:         Album.ts
//  Description:  Exports the interface for an Album object
//

// Custom imports
import IAlbumTrack from "./AlbumTrack";

export default interface IAlbum {
  name: string;
  artist: string;
  mbid: string;
  tracks: IAlbumTrack[];
  image: string;
}
