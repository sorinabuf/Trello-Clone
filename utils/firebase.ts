import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1XF4mO0WRTQdcKAR09_xQCMLzvPO4GlE",
  authDomain: "trello-3d0aa.firebaseapp.com",
  projectId: "trello-3d0aa",
  storageBucket: "trello-3d0aa.appspot.com",
  messagingSenderId: "222140441756",
  appId: "1:222140441756:web:0497e8a60e767d5656f959"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the auth service
export const firebaseAuth = getAuth(firebaseApp);
