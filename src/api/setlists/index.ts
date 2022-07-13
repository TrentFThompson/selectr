//
//  File:         setlists/index.ts
//  Description:  Export the setlist api functions
//

// Custom imports
import findAll from "./findAll";
import addTrack from "./addTrack";
import create from "./create";
import remove from "./remove";
import addAlbum from "./addAlbum";

// Create the api
const SetlistApi = { findAll, addTrack, create, remove, addAlbum };

export default SetlistApi;
