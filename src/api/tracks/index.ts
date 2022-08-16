//
//  File:         tracks/index.ts
//  Description:  Export the setlist api functions
//

// Custom imports
import findAll from "./findAll";
import remove from "./remove";
import search from "./search";

// Create the api
const TracksApi = { findAll, remove, search };

export default TracksApi;
