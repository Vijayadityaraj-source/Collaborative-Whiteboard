import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyADDAprGpOt7XV-yxu-5-Sojsw3b7hwAyA",
  authDomain: "collaborativewhiteboard-628c3.firebaseapp.com",
  projectId: "collaborativewhiteboard-628c3",
  storageBucket: "collaborativewhiteboard-628c3.appspot.com",
  messagingSenderId: "53737327666",
  appId: "1:53737327666:web:a86f61d1574934e568c02b",
  measurementId: "G-DT1NKMQ0DM"
};

firebase.initializeApp(firebaseConfig);

// Custom hook for handling authentication
export const useAuth = () => {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((currentUser) => {
        setUser(currentUser);
      });
  
      // Cleanup function
      return () => unsubscribe();
    }, []);
  
    return user;
};

// Authentication-related functions
export const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
};
  
export const signOut = async () => {
    await auth.signOut();
};

export const auth = firebase.auth();
export const database = firebase.database();

