"use client";

import { addUser, getUser } from "@/utils/data";
import { firebaseAuth } from "@/utils/firebase/config";
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { useContext, useEffect } from "react";

interface AuthContextProps {
  currentUser: User | null;
  currentUserId: number | null;
  setCurrentUserId: React.Dispatch<React.SetStateAction<number | null>>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextProps>(
  {} as AuthContextProps
);

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [currentUserId, setCurrentUserId] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const auth = firebaseAuth;

  function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        console.log("User is signed in.");

        setLoading(false);

        getUser(user["email"]!)
          .then((result) => {
            setCurrentUserId(result["user_id"]);
          })
          .catch(() => {
            addUser(user["email"]!).then((result) => {
              setCurrentUserId(result["user_id"]);

              console.log("User added to database");
            });
          });
      } else {
        setCurrentUser(null);
        console.log("No user is signed in.");

        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    currentUserId,
    setCurrentUserId,
    signUp,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
