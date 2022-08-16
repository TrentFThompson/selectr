//
//  File:         tracks/index.ts
//  Description:  Exports the zod schemas for tracks on a setlist
//

// Installed imports
import { z } from "zod";

// Track creation request schema
const create = z
  .object({
    name: z.string(),
    artist: z.string(),
    album: z.string(),
    image: z.string(),
  })
  .strict()
  .transform((val) => ({
    ...val,
    name_upper: val.name.toUpperCase(),
    artist_upper: val.artist.toUpperCase(),
    album_upper: val.album.toUpperCase(),
  }));
export { create };
export default { create };
