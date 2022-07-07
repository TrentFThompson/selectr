//
//  File:         setlists/index.ts
//  Description:  Exports the zod schemas for setlists
//

// Installed imports
import { z } from "zod";

// Setlist creation request schema
const create = z.object({
  name: z.string(),
});

export { create };
export default { create };
