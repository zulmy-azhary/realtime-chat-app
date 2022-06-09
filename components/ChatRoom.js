import { useState } from "react";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import SendMessage from "./SendMessage";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const smVariant = { navigation: 'drawer', navigationButton: true }
const mdVariant = { navigation: 'sidebar', navigationButton: false }

const ChatRoom = ({ children, email }) => {
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant })
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)

	return (
    <Box minHeight="100vh" height="100vh">
      <Navbar
        showSidebarButton={variants?.navigationButton}
        onShowSidebar={toggleSidebar}
        email={email}
      />
      <Sidebar
        variant={variants?.navigation}
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
      />
      
      { children }
      <SendMessage />
		</Box>
	);
};

export default ChatRoom;
