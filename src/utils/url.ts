//
//  File: url.ts
//  Description: Exports the URL's used by the system
//

// URL for lastfm searching
const lastFmURL = "http://ws.audioscrobbler.com/2.0/";
const apiURL =
  process.env.NODE_ENV === "production"
    ? "https://selectr.ca/api/v1"
    : "http://localhost:3000/api/v1";

export { lastFmURL, apiURL };
