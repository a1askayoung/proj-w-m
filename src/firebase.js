// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';                              //! firebase #1.1

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARr-4PlABoATXhe--l51Jif0OmrBy645I",
  authDomain: "marketplace-99b27.firebaseapp.com",
  projectId: "marketplace-99b27",
  storageBucket: "marketplace-99b27.appspot.com",
  messagingSenderId: "799745241787",
  appId: "1:799745241787:web:8dd1a82a69e789bd05ef9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)                                  //! firebase #1
export default app;                                             //! 