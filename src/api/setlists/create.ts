//
//  File:         create.ts
//  Description:  Exports the setlist create function
//

// Installed imports
import axios from "axios";

// Custom imports
import { apiURL } from "@/utils/url";

//
// Function:    create
// Description: Uses api to create a setlist
// Parameters:  name: string - the name of the new setlist
// Returns:     the new setlist
//
export default async function create(name: string) {
  try {
    const { data } = await axios.post(`${apiURL}/setlists`, { name });
    return data;
  } catch {
    throw new Error("Server error. Try again later.");
  }
}
