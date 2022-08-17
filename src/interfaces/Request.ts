//
//  File:         Request.ts
//  Description:  Exports the interface for a Request object
//

export default interface IRequest {
  uid: string;
  name: string;
  artist: string;
  id?: string;
  album: string;
  read?: boolean;
  title: string;
}
