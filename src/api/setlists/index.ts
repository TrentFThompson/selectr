//
//  File:         setlists/index.ts
//  Description:  Export the setlist api functions
//

// Custom imports
import findAll from "./findAll";
import addTrack from "./addTrack";
import create from "./create";

// Create the api
const SetlistApi = { findAll, addTrack, create };

export default SetlistApi;
