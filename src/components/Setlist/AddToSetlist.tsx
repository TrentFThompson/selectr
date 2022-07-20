//
//  File:         AddToSetlist.tsx
//  Description:  Exports the add to setlist component
//

// Installed imports
import {
  Button,
  Flex,
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
import { SyntheticEvent, useState } from "react";

// Custom imports
import ISetlist from "@/interfaces/Setlist";
import CreateSetlist from "@/components/Setlist/CreateSetlist";
import SetlistApi from "@/api/setlists";
import { useMessage } from "@/context/message-context";
import { useAuth } from "@/context/auth-context";

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
  const [setlistState, setSetlistState] = useState<ISetlist[]>(setlists);
  const { success } = useMessage();
  const { authRequest } = useAuth();

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

  //
  // Function:    onSetlistCreate
  // Description: Handles the setlist creation for this component
  // Parameters:  name: string - the name of the new setlist
  // Returns:     n/a
  //
  async function onSetlistCreate(name: string) {
    return await authRequest(async (token: string) => {
      const setlist = await SetlistApi.create(name, token);
      setSetlistState((prevState) => [...prevState, setlist]);
      success("New setlist created.");
    });
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
                  {setlistState.map((s) => {
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
            <CreateSetlist onSubmit={onSetlistCreate} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
