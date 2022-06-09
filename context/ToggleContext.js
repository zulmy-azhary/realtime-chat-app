import { useBreakpointValue } from "@chakra-ui/react";
import { createContext, useState } from "react";

const smVariant = { navigation: 'drawer', navigationButton: true }
const mdVariant = { navigation: 'sidebar', navigationButton: false }

export const ToggleContext = createContext();

export const ToggleProvider = ({children}) => {
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant })
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)
  
  const props = { variants, isSidebarOpen, setSidebarOpen, toggleSidebar }
  
  return (
    <ToggleContext.Provider value={props}>
      {children}
    </ToggleContext.Provider>
  );
};