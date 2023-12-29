import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { getDatabase,ref,set,onValue,child, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyADDAprGpOt7XV-yxu-5-Sojsw3b7hwAyA",
  authDomain: "collaborativewhiteboard-628c3.firebaseapp.com",
  databaseURL: "https://collaborativewhiteboard-628c3-default-rtdb.firebaseio.com",
  projectId: "collaborativewhiteboard-628c3",
  storageBucket: "collaborativewhiteboard-628c3.appspot.com",
  messagingSenderId: "53737327666",
  appId: "1:53737327666:web:a86f61d1574934e568c02b",
  measurementId: "G-DT1NKMQ0DM"
};

const app=firebase.initializeApp(firebaseConfig);
const db = getDatabase(app);

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

export const writeSceneData = (email, data) => {
  const encodedEmail = btoa(email);

  // Check for undefined values in the data
  const cleanData = removeUndefinedValues(data);

  set(ref(db, 'Scenes/' + encodedEmail), {
    email: email,
    data: cleanData,
  });
};

// Function to recursively remove undefined values from an object
const removeUndefinedValues = (obj) => {
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (value === undefined) {
          delete obj[key];
        } else if (typeof value === 'object') {
          removeUndefinedValues(value);
        }
      }
    }
  }
  return obj;
};


export const readSceneDataOnce = (email) => {
  return new Promise((resolve, reject) => {
    const encodedEmail = btoa(email);
    const dbRef = ref(getDatabase(app));

    get(child(dbRef, `Scenes/${encodedEmail}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        resolve(snapshot.val());
      } else {
        console.log("No data available");
        resolve(null); // Resolve with null if no data is available
      }
    }).catch((error) => {
      console.error(error);
      reject(error);
    });
  });
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