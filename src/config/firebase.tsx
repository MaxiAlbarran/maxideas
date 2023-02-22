import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmsc9eXIWzF4xipfvEGGxGI63sPhj7pic",
  authDomain: "maxideas-c85ad.firebaseapp.com",
  projectId: "maxideas-c85ad",
  storageBucket: "maxideas-c85ad.appspot.com",
  messagingSenderId: "769393630971",
  appId: "1:769393630971:web:864b52561e3b10a5c55a5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);