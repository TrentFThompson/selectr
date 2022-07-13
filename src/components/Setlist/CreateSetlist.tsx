//
//  File:         CreateSetlist.tsx
//  Description:  Exports the create setlist component
//

// Installed imports
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { SyntheticEvent } from "react";

// Custom imports
import { useMessage } from "@/context/message-context";
import SetlistApi from "@/api/setlists";

// Prop definition
interface IProps {
  onSubmit: (name: string) => void;
}

//
//  Component:    CreateSetlist
//  Description:  Shows a form to create a setlist
//
export default function AddToSetlist({ onSubmit }: IProps) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { failure } = useMessage();

  //
  // Function:    _onSubmit
  // Description: Handles submitting this form
  // Parameters:  e: SyntheticEvent - the form submit event
  // Returns:     n/a
  //
  async function _onSubmit(e: SyntheticEvent) {
    e.preventDefault();

    // Cast target to get name
    const { name } = e.target as typeof e.target & {
      name: { value: string };
    };

    // Validate
    if (!name.value) {
      failure("Please enter a name.");
      return;
    }

    // Submit and close
    onSubmit(name.value);
    onClose();
  }

  return (
    <>
      <Button onClick={onOpen}>New Setlist</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{"Create Setlist"}</ModalHeader>
          <ModalBody>
            <form onSubmit={_onSubmit}>
              <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input name="name" id="name" />
                <Button bg={"green"} type="submit">
                  Confirm
                </Button>
                <Button onClick={() => onClose()}>Cancel</Button>
              </FormControl>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
