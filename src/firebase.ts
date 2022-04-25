// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection } from 'firebase/firestore/lite';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_3VRa__tPGE8AHjAiPx7TBXrk_cLOx88",
  authDomain: "my-blog-b02ac.firebaseapp.com",
  projectId: "my-blog-b02ac",
  storageBucket: "my-blog-b02ac.appspot.com",
  messagingSenderId: "715808730048",
  appId: "1:715808730048:web:6bc078b9b8c49d399af625",
  measurementId: "G-Q40Q0ZPJE2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);