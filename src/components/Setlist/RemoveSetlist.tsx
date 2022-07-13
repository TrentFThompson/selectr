//
//  File:         RemoveSetlist.tsx
//  Description:  Exports the RemoveSetlist component
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
import ISetlist from "@/interfaces/Setlist";

// Component props
interface IProps {
  setlist: ISetlist;
  onClick: (id: string) => void;
}

//
//  Component:    RemoveSetlist
//  Description:  Displays a modal to remove a setlist
//
export default function RemoveSetlist({ setlist, onClick }: IProps) {
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
            {`Are you sure you would like to remove ${setlist.name}?`}
          </ModalBody>
          <ModalFooter>
            <Button bg={"green"} onClick={() => _onClick(setlist.id)}>
              Confirm
            </Button>
            <Button onClick={() => onClose()}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
