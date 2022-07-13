//
//  File:         tracks/index.ts
//  Description:  Export the setlist api functions
//

// Custom imports
import findAll from "./findAll";
import remove from "./remove";

// Create the api
const TracksApi = { findAll, remove };

export default TracksApi;
