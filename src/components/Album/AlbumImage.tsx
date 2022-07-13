//
//  File:         AlbumImage.tsx
//  Description:  Exports the album image component
//

// Installed imports
import { Image, Text } from "@chakra-ui/react";

// Prop definition
interface IProps {
  image: string;
}

//
//  Component:    AlbumImage
//  Description:  Displays album image or not available message
//
export default function AlbumImage({ image }: IProps) {
  if (!image) {
    return <Text>Image not available.</Text>;
  }

  return <Image src={image} alt="" />;
}
