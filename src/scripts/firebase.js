// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  doc,
  getDoc,
  getDocs,
  collection,
  where,
  addDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDadX4nUbR726kQJliVIUYQblqXKAkeA84",
  authDomain: "biodevices-without-borders-app.firebaseapp.com",
  projectId: "biodevices-without-borders-app",
  storageBucket: "biodevices-without-borders-app.appspot.com",
  messagingSenderId: "920197475483",
  appId: "1:920197475483:web:03db93df485491309e2a3e",
  measurementId: "G-R1FY70VX68"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


export const logInWithEmailAndPassword = async (email, password) => {
  console.log("Logging in with email: ", email, " and password: ", password);
  await signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("Logged in user");
    // ...
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
};

export const registerWithEmailAndPassword = async (email, password) => {
  console.log("Registering with email: ", email, " and password: ", password);
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("User Registered:");
    // ...
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
};

export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const logout = () => {
  signOut(auth);
};







const getUserName = () => {
  return getAuth().currentUser.displayName;
}

export const postReading = async (reading) => {
  try {
    await addDoc(collection(getFirestore(), 'readings'), {
      name: getUserName(),
      ...reading,
      timestamp: serverTimestamp()
    });
  }
  catch(error) {
    console.error('Error posting reading to Firebase Database', error);
  }

  console.log("Posted Reading")
}

export const getReading = async (id) => {
  try {
    let reading = {};
    const docRef = doc(db, "readings", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      reading = docSnap.data();
    } else {
      throw new Error(`No reading found with id: ${id}`);
    }
    console.log("Got Reading")
    return reading;
  } catch(error) {
    console.error('Error getting reading from Firebase Database', error);
  }
}

export const getReadings = async () => {
  const readings = [];
  // Create the query to load the last 12 messages and listen for new ones.
  const recentReadingsQuery = query(collection(getFirestore(), 'readings'), orderBy('timestamp', 'desc'), limit(12));
  
  const querySnapshot = await getDocs(recentReadingsQuery);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    readings.push({
      id: doc.id,
      ...doc.data()
    });
  });

  console.log("Got Readings")
  return readings;
}

export const doesDocExist = async (collectionName, docName) => {
  try {
    const docRef = doc(db, collectionName, docName);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch(error) {
    console.error('Error getting reading from Firebase Database', error);
  }
}