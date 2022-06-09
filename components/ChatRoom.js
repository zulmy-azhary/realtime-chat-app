import { Box } from "@chakra-ui/react";
import SendMessage from "./SendMessage";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { ToggleProvider } from "../context/toggleContext";

const ChatRoom = ({ children, email }) => {
  return (
    <ToggleProvider>
      <Box minHeight="100vh" height="100vh">
        <Navbar email={email} />
        <Sidebar />
        { children }
        <SendMessage />
      </Box>
    </ToggleProvider>
	);
};

export default ChatRoom;
