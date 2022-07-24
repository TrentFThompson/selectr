//
//  File:         requests/index.ts
//  Description:  Exports the zod schemas for requests
//

// Installed imports
import { z } from "zod";

// Request creation schema
const create = z
  .object({
    artist: z.string(),
    name: z.string(),
    album: z.string(),
    uid: z.string(),
  })
  .strict();

export { create };
export default { create };
