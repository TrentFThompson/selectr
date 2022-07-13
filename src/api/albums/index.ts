//
//  File:         albums/index.ts
//  Description:  Export the album api functions
//

// Custom imports
import search from "./search";
import findOne from "./findOne";

// Create the api
const AlbumApi = { search, findOne };

export default AlbumApi;
