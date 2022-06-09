import { Avatar, Box, Flex, Text, VStack } from '@chakra-ui/react';
import { collection, doc, orderBy, query } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import ChatRoom from '../../components/ChatRoom';
import { auth, db } from '../../config/firebase';
import { ToggleContext } from '../../context/toggleContext';
import { getOtherEmail } from '../../utils/getOtherEmail';

const Chat = () => {
  const [user] = useAuthState(auth)
  const router = useRouter()
  const { id } = router.query
  const q = query(collection(db, `chats/${id}/messages`), orderBy('timestamp'));
  const [messages] = useCollectionData(q)
  const [chat] = useDocumentData(doc(db, `chats/${id}`))
  const props = useContext(ToggleContext);

  return (
    <ChatRoom email={getOtherEmail(chat?.users, user)}>
      <VStack flexGrow={1} minHeight="100%" width="100%" overflowY="auto" px={3} pt={130} spacing={3}>
        {messages?.map((message, idx) => {
          const sender = message.sender === user.email;
          return (
            sender ? (
              <Flex key={idx} width="100%" justifyContent="flex-end">
                <Box px={5} py={2} borderLeftRadius={15} borderBottomRightRadius={15} bg="whatsapp.400">
                  <Text fontSize="sm" fontWeight="semibold" color="black" align="end">
                    {message.text}
                  </Text>
                </Box>
              </Flex>
            ) : (
              <Flex key={idx} width="100%" justifyContent="flex-start" gap={2}>
                <Avatar src={message.photoURL} size="sm" />
                <Box px={5} py={2} borderRightRadius={15} borderBottomLeftRadius={15} bg="gray.200">
                  <Text fontSize="sm" fontWeight="semibold" color="black">
                    {message.text}
                  </Text>
                </Box>
              </Flex>
            )
          )
        })}
      </VStack>
    </ChatRoom>
  );
};

export default Chat;