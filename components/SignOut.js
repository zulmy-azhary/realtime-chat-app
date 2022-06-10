import { Text } from "@chakra-ui/react";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";

const SignOut = () => {
	const router = useRouter();

	const signOutHandler = () => {
		signOut(auth).then(() => {
			router.push("/");
		}).catch(e => console.log(e));
	}

	return <Text width="100%" align="center" fontWeight="semibold" color="black" onClick={() => signOutHandler()}>Sign Out</Text>;
};

export default SignOut;
