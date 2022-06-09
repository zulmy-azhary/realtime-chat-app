import { Button, Text, Flex } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { FaGoogle } from "react-icons/fa";
import { auth } from "../config/firebase";

const Login = () => {
	const [signInWithGoogle] = useSignInWithGoogle(auth);

	return (
		<Flex justifyContent="center" alignItems="center" direction="column" height="100vh">
			<Text fontSize="2xl" mb="1.5rem" fontWeight="bold">
				Hey! Welcome Back!
			</Text>
			<Button
				onClick={() => signInWithGoogle("", {prompt: "select_account"})}
				bg="gray.300"
				border="1px"
				borderColor="gray.400"
				leftIcon={<FaGoogle />}
			>
				Sign In With Google
			</Button>
		</Flex>
	);
};

export default Login;
