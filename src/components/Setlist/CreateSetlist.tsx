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

//
//  Component:    CreateSetlist
//  Description:  Shows a form to create a setlist
//
export default function AddToSetlist() {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { failure, success } = useMessage();

  //
  // Function:    onSubmit
  // Description: Handles submitting this form
  // Parameters:  e: SyntheticEvent - the form submit event
  // Returns:     n/a
  //
  async function onSubmit(e: SyntheticEvent) {
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

    // Use api to create, and error check
    try {
      await SetlistApi.create(name.value);
      success("New setlist created.");
    } catch (error: any) {
      failure(error.message);
    }

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
            <form onSubmit={onSubmit}>
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
