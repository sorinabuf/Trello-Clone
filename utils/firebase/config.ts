import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Trello app Firebase configuration.
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initializes Firebase.
const firebaseApp = initializeApp(firebaseConfig);

// Gets reference to the Firebase auth service.
export const firebaseAuth = getAuth(firebaseApp);

export default firebaseApp;
