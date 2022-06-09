import { Box, Flex, Text, Menu, MenuButton, Avatar, MenuList, MenuItem, IconButton, MenuDivider, MenuGroup} from "@chakra-ui/react";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import SignOut from "./SignOut";
import { GiHamburgerMenu } from "react-icons/gi";
import { useContext } from "react";
import { ToggleContext } from "../context/toggleContext";

const Navbar = ({email}) => {
  const [user] = useAuthState(auth)
  const props = useContext(ToggleContext);
  const { variants, toggleSidebar = true } = props

  return (
    <Box bg="whatsapp.500" p={5} pos="fixed" top={0} left={0} right={0} zIndex={99}>
      <Flex justifyContent="space-between" alignItems="center">
        {variants?.navigationButton && (
          <IconButton
            icon={<GiHamburgerMenu w={8} h={8} />}
            colorScheme="whiteAlpha"
            variant='ghost'
            onClick={toggleSidebar}
          />
        )}
        <Text fontSize="lg" fontWeight="semibold" color="white">{email}</Text>
        <Menu>
          <MenuButton>
            <Avatar size="sm" border="2px" borderColor="gray.200" src={user?.photoURL} name={user?.displayName} />
          </MenuButton>
          <MenuList color="black">
            <MenuGroup>
              <MenuItem><Text w="100%" align="center" fontWeight="semibold">{user?.displayName}</Text></MenuItem>
              <MenuItem><Text w="100%" align="center" fontSize="sm" fontWeight="semibold" color="gray.400">{user?.email}</Text></MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuItem><SignOut /></MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default Navbar;