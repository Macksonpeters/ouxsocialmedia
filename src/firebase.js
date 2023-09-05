// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwOGPba48Nda2TNLBRr6qpgxpAYxfpZY4",
  authDomain: "socialmediaweb-b9c91.firebaseapp.com",
  projectId: "socialmediaweb-b9c91",
  storageBucket: "socialmediaweb-b9c91.appspot.com",
  messagingSenderId: "785135146302",
  appId: "1:785135146302:web:8d77d0db5a30747eb7886f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const googleAuth = new GoogleAuthProvider();
