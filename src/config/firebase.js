// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9h_2JhIfjRTqVKGfeUE8faTBmsDFVEgM",
  authDomain: "crud-4f835.firebaseapp.com",
  projectId: "crud-4f835",
  storageBucket: "crud-4f835.appspot.com",
  messagingSenderId: "929815309621",
  appId: "1:929815309621:web:d5c9c5d552bcf55c14307c"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const database = getFirestore();