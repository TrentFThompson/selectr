//
//  File:         RemoveTrack.tsx
//  Description:  Exports the RemoveTrack component
//

// Installed imports
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

// Custom imports
import ITrack from "@/interfaces/Track";

// Component props
interface IProps {
  track: ITrack;
  onClick: (id: string) => void;
}

//
//  Component:    RemoveTrack
//  Description:  Displays a modal to remove a track from a setlist
//
export default function RemoveTrack({ track, onClick }: IProps) {
  const { onOpen, onClose, isOpen } = useDisclosure();

  //
  //  Function:     _onClick
  //  Description:  handles confirm button click
  //  Params:       id: string - the id to pass to the parent onClick
  //  Returns:      n/a
  //
  async function _onClick(id: string) {
    await onClick(id);
    onClose();
  }

  return (
    <>
      <Button bg="red" onClick={onOpen}>
        Remove
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Remove track?</ModalHeader>
          <ModalBody>
            {`Are you sure you would like to remove ${track.artist} - ${track.name} from this setlist?`}
          </ModalBody>
          <ModalFooter>
            <Button bg={"green"} onClick={() => _onClick(track.id!)}>
              Confirm
            </Button>
            <Button onClick={() => onClose()}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
