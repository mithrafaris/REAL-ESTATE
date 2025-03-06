// Import the functions you need from the Firebase SDK
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-86157.firebaseapp.com",
  projectId: "mern-estate-86157",
  storageBucket: "mern-estate-86157.appspot.com",
  messagingSenderId: "930353062961",
  appId: "1:930353062961:web:371ce8b4ee57d1b4ae2110"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
