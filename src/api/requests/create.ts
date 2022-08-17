//
//  File:         create.ts
//  Description:  Exports the setlist create function
//

// Installed imports
import axios from "axios";

// Custom imports
import { apiURL } from "@/utils/url";
import handleError from "../errors/handleError";
import IRequest from "@/interfaces/Request";

//
// Function:    create
// Description: Uses api to create a request
// Parameters:  request: IRequest - the request to add to the database
// Returns:     The newly created request
//
export default async function markAllAsRead(request: IRequest) {
  return await handleError(async () => {
    const { data } = await axios.post(`${apiURL}/requests`, request);
    return data;
  });
}
