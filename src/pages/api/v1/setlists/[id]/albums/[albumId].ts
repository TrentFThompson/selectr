//
//  File:         [albumId].ts
//  Description:  Exports the handler for the
//                /setlists/[id]/albums/[albumid] api route
//

// Installed imports
import { NextApiRequest, NextApiResponse } from "next";

// Custom imports
import { BadRequestError, NotFoundError } from "@/server/errors";
import handleError from "@/server/errors/handleError";
import db from "@/database/index";
import { Collections } from "@/database/collections";
import lastfm from "@/server/lastfm";
import authenticateRequest from "@/server/auth/authenticateRequest";

//
//  Function:     handler
//  Description:  handles facilitating the different request methods
//  Params:       req: NextApiRequest - the request object
//                res: NextApiResponse - the response object
//
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "POST": {
        return await authenticateRequest(req, res, post);
      }
      default: {
        throw new BadRequestError("Method not implemented");
      }
    }
  } catch (error: any) {
    return handleError(error, res);
  }
}

//
//  Function:     post
//  Description:  handles facilitating post requests - adds an entire album
//                to a setlist
//  Params:       uid: string - the user id of the request
//                req: NextApiRequest - the request object
//                res: NextApiResponse - the response object
//  Returns:      the album added to the setlist
//
async function post(uid: string, req: NextApiRequest, res: NextApiResponse) {
  const { id, albumId } = req.query;

  // Fix for type issues for now
  if (!albumId || Array.isArray(albumId)) {
    throw new NotFoundError("Track");
  }
  // Fix for type issues for now
  if (!id || Array.isArray(id)) {
    throw new NotFoundError("Track");
  }

  // Ensure the setlist belongs to the user
  await db.findWithUid(Collections.Setlists, id, uid);

  // Look up the album
  const album = await lastfm.albumInfo(albumId);

  // Add each track to the setlist
  for (let i = 0; i < album.tracks.length; i++) {
    await db.insert(`${Collections.Setlists}/${id}/${Collections.Tracks}`, {
      name: album.tracks[i].name,
      artist: album.artist,
      album: album.name,
      name_upper: album.tracks[i].name.toUpperCase(),
      artist_upper: album.artist.toUpperCase(),
      album_upper: album.name.toUpperCase(),
      image: album.image,
    });
  }

  // Return the album
  return res.status(201).json(album);
}
