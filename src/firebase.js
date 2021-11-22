// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCa4XOUxWQUSiB6Gn_rZfVG9kYq3bo-UkQ",
  authDomain: "my-dictionary-7e20e.firebaseapp.com",
  projectId: "my-dictionary-7e20e",
  storageBucket: "my-dictionary-7e20e.appspot.com",
  messagingSenderId: "791839827796",
  appId: "1:791839827796:web:382fdffcf858cab3af8ac1",
  measurementId: "G-2X4YTTHJ5Z"
};

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()