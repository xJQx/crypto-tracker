import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import firebaseConfig from "./config/firebaseConfig";

const firebaseApp = initializeApp(firebaseConfig);

// For Authentication
const auth = getAuth(firebaseApp); 
// For Using Database
const db = getFirestore(firebaseApp); 

export { auth, db };