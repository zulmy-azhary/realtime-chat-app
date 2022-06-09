import { Box, Input, Button, Flex, Spacer, FormControl } from "@chakra-ui/react";
import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { db, auth } from "../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

const SendMessage = () => {
  const [user] = useAuthState(auth)
  const [msg, setMsg] = useState("");
  const router = useRouter();
  const { id } = router.query;
  
  const sendMessageHandler = async e => {
    e.preventDefault();
    if (msg) {
      await addDoc(collection(db, `chats/${id}/messages`), {
        text: msg,
        photoURL: user.photoURL,
        sender: user.email,
        fullName: user.displayName,
        timestamp: serverTimestamp()
      })
      setMsg("");
    }
  }
  return (
    <Box pos="fixed" bottom={0} left={0} right={0} zIndex={99} p={4} bg="gray.100">
      <FormControl onSubmit={sendMessageHandler} as="form">
        <Flex gap={2}>
          <Input value={msg} onChange={e => setMsg(e.target.value)} fontSize="sm" placeholder="Masukkan pesan..." bg="white" autoComplete="off" />
          <Spacer />
          <Button type="submit" leftIcon={<FiSend />} colorScheme="whatsapp" aria-label="send" px={6} fontSize="sm">Kirim</Button>
        </Flex>
      </FormControl>
    </Box>
  );
};

export default SendMessage;