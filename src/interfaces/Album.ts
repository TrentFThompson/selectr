//
//  File:         Album.ts
//  Description:  Exports the interface for an Album object
//

import ITrack from "./Track";

export default interface IAlbum {
  name: string;
  artist: string;
  mbid: string;
  tracks?: ITrack[];
  image?: string;
}
