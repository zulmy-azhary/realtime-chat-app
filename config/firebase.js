import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
	apiKey: "AIzaSyAWFbfuAwg0ihxVQOJBEG3kXlCPmf5UVjc",
	authDomain: "chat-app-a33a6.firebaseapp.com",
	projectId: "chat-app-a33a6",
	storageBucket: "chat-app-a33a6.appspot.com",
	messagingSenderId: "991378455325",
	appId: "1:991378455325:web:7f8337d4cc8e77b628fff4",
	measurementId: "G-BJSGT6Q2DC",
});

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { db, auth };
