// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "propertyplus-bd1ab.firebaseapp.com",
  projectId: "propertyplus-bd1ab",
  storageBucket: "propertyplus-bd1ab.appspot.com",
  messagingSenderId: "774077457114",
  appId: "1:774077457114:web:25809d669d6da3383cbbe3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
