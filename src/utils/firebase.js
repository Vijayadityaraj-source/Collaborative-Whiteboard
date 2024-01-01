import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { getDatabase,ref,set,child,get,onValue,runTransaction } from "firebase/database";

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

/* AUTHENTICATION */
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

export const signInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  await auth.signInWithPopup(provider);
};

export const signOut = async () => {
  await auth.signOut();
};
export const auth = firebase.auth();
export const database = firebase.database();

/* SCENE DATA HANDLING */
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
        resolve(snapshot.val());
      } else {
        console.log("No data available");
        resolve(null);
      }
    }).catch((error) => {
      console.error(error);
      reject(error);
    });
  });
};

/* ROOM DATA HANDLING */
export const readRoomData = (roomid) => {
  return new Promise((resolve,reject)=>{
    const dbRef = ref(getDatabase(app));

    get(child(dbRef, `Rooms/${roomid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        resolve(snapshot.val());
      } else {
        console.log("No data available");
        resolve(null);
      }
    }).catch((error) => {
      console.error(error);
      reject(error);
    });
  });
};

//to handle concurrent modifications we are using transactions.
export const writeRoomData = (roomid,user,data) => {
  const encodedEmail = btoa(user.email);
  const cleanData = removeUndefinedValues(data);
  const dbRef = ref(db, 'Rooms/' + roomid + '/Collaborators/' + encodedEmail);
  const otherdbRef = ref(db,'Rooms/'+roomid)

  runTransaction(dbRef, (post) => {
    set(otherdbRef, {
      data:cleanData
    });
    set(dbRef, {
      email: user.email,
      photoURL: user.photoURL,
    });
  });
};