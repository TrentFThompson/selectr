//
//  File:         AddToSetlist.tsx
//  Description:  Exports the add to setlist component
//

// Installed imports
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { SyntheticEvent } from "react";

// Custom imports
import ISetlist from "@/interfaces/Setlist";

// Prop Definition
interface IProps<T> {
  setlists: ISetlist[];
  title: string;
  onSubmit: (id: string, data: T) => void;
  payload: T;
}

//
//  Component:    AddToSetlist
//  Description:  Shows a form to add an item to a setlist
//
export default function AddToSetlist<T>({
  setlists,
  title,
  onSubmit,
  payload,
}: IProps<T>) {
  const { onOpen, onClose, isOpen } = useDisclosure();

  //
  // Function:    _onSubmit
  // Description: Handles submitting this form
  // Parameters:  e: SyntheticEvent - the form submit event
  // Returns:     n/a
  //
  async function _onSubmit(e: SyntheticEvent) {
    e.preventDefault();

    // Cast target to get setlist
    const { setlist } = e.target as typeof e.target & {
      setlist: { value: string };
    };

    // Use submit handler and close the modal
    await onSubmit(setlist.value, payload);
    onClose();
  }

  return (
    <>
      <Button onClick={onOpen}>Add to setlist</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`Add ${title} to setlist?`}</ModalHeader>
          <ModalBody>
            <form onSubmit={_onSubmit}>
              <FormControl>
                <FormLabel htmlFor="setlist">Setlist</FormLabel>
                <Select name="setlist" id="setlist">
                  {setlists.map((s) => {
                    return (
                      <option value={s.id} key={s.id}>
                        {s.name}
                      </option>
                    );
                  })}
                </Select>
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
