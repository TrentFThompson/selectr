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
  })
  .strict();

export { create };
export default { create };
