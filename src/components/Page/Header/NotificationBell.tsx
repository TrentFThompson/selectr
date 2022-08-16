//
//  File:         NotificationBell.tsx
//  Description:  Export the NotificationBell component
//

// Installed imports
import {
  Flex,
  IconButton,
  Circle,
  Text,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";

// Custom imports
import { useRequests } from "@/context/request-context";
import IRequest from "@/interfaces/Request";

//
//  Component:    NotificationBell
//  Description:  Render the notification bell header component
//
export default function NotificationBell() {
  const { requests, markAsRead, unreadRequests } = useRequests();

  return (
    <Flex position={"relative"}>
      <NotificationMenu requests={requests} onClick={markAsRead} />
      {unreadRequests > 0 && (
        <Circle
          top={"25px"}
          left={"30px"}
          position={"absolute"}
          size="20px"
          bg={"red"}
        >
          <Text>{unreadRequests}</Text>
        </Circle>
      )}
    </Flex>
  );
}

//
//  Component:    NotificationMenu
//  Description:  Renders the menu for the notification bell
//
function NotificationMenu({
  requests,
  onClick,
}: {
  requests: IRequest[];
  onClick: Function;
}) {
  return (
    <Menu onOpen={() => onClick()}>
      <MenuButton as={IconButton} aria-label="Options" icon={<BellIcon />} />
      <MenuList>
        {requests && requests.length > 0 ? (
          requests.map((r) => {
            return (
              <MenuItem key={r.id}>
                <Text>{`${r.artist} - ${r.album} - ${r.name}`}</Text>
              </MenuItem>
            );
          })
        ) : (
          <MenuItem>
            <Text>No requests</Text>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}
