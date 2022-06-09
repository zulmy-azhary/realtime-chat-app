import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  VStack,
  Divider,
  Flex,
  Text,
  Avatar,
  StackDivider,
  Button,
} from '@chakra-ui/react'
import { addDoc, collection } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../config/firebase';
import { getOtherEmail } from '../utils/getOtherEmail';
import { useRouter } from "next/router";
import { AiOutlinePlus } from "react-icons/ai";

const Sidebar = ({ isOpen, variant, onClose }) => {
  const [user] = useAuthState(auth)
  const [snapshot, loading, error] = useCollection(collection(db, "chats"));
  const chats = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const router = useRouter();
  console.log(chats)

  const userClickHandler = id => {
    router.push(`/chat/${id}`);
  }

  const chatExist = email => chats?.find(chat => (chat.users.includes(user.email)) && chat.users.includes(email));

  const newChat = async () => {
    const input = prompt('Enter email address');
    if (!chatExist(input) && user.email !== input) {
      await addDoc(collection(db, "chats"), {users: [user.email, input]})
    }
  }
  
  const SidebarContent = ({ onClick }) => {
    return (
      <VStack align="flex-start" divider={<StackDivider borderColor='gray.200' />}>
        <Divider />
        {chats?.filter(chat => chat.users.includes(user.email))
          .map((chat, idx) => {
          return (
            <Box width="100%" key={idx} onClick={() => userClickHandler(chat.id)} _hover={{ bg:"gray.200" }}>
              <Flex onClick={onClick} justifyContent="flex-start" alignItems="center" gap={5} px={5} py={3} cursor="pointer">
                <Avatar size="sm" src="" />
                <Text fontSize="md" fontWeight="semibold" variant="ghost" w="100%">
                  {getOtherEmail(chat.users, user)}
                </Text>
              </Flex>
            </Box>
          )
        })}
        <Divider />
      </VStack>
    )
  }

  return variant === 'sidebar' ? (
    <Box
      position="fixed"
      left={0}
      p={5}
      w="300px"
      top={0}
      h="100%"
      bg="gray.100"
    >
      <SidebarContent onClick={onClose} />
    </Box>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <Flex p={6} justifyContent="space-between" alignItems="center" bg="whatsapp.500">
            <DrawerHeader flexGrow={1} color="white" fontWeight="bold" fontSize="xl" letterSpacing='wide' p={0}>Chat List</DrawerHeader>
            <DrawerCloseButton color="white" pos="sticky" />
          </Flex>
          <DrawerBody p={0} overflowX="hidden" mt={2}>
            <Divider />
            <Button onClick={newChat} variant="ghost" color="black" width="100%" px={5} py={3} leftIcon={<AiOutlinePlus />} >New Chat</Button>
            <Divider />
            <SidebarContent onClick={onClose} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default Sidebar
