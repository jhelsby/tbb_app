// Import the functions you need from the SDKs you need

import { FirebaseApp, initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  UserCredential,
  User,
  Auth,
} from "firebase/auth";
import {
  getFirestore,
  query,
  doc,
  getDoc,
  getDocs,
  collection,
  addDoc,
  serverTimestamp,
  orderBy,
  limit,
  DocumentReference,
  DocumentData,
  DocumentSnapshot,
  Query,
  Firestore,
} from "firebase/firestore";

import { TNews, TReading } from "./types";



/**
 * Firebase Config
 */
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
export const app: FirebaseApp = initializeApp(firebaseConfig);
// gets the auth service
export const auth: Auth = getAuth(app);
// gets the firestore database
export const db: Firestore = getFirestore(app);


/**
 * logins in a user with email and password
 * @param email - the email of the user
 * @param password - the password of the user
 * 
 * @returns the user if successful, null otherwise
 * 
 * @throws error if there is an error
*/
export const logInWithEmailAndPassword = async (email: string, password: string) : Promise<User | null> => {
  let user: User | null = null;
  console.log("Logging in with email: ", email, " and password: ", password);
  await signInWithEmailAndPassword(auth, email, password)
  .then((userCredential: UserCredential) => {
    // Signed in 
    user = userCredential.user;
    console.log("Logged in user");
  }).catch((error: any) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Error Code: ${errorCode} Error Message: ${errorMessage}`)
  });
  return user;
};

/**
 * Register and new user with email and password
 * 
 * @param email 
 * @param password 
 * @returns 
 */
export const registerWithEmailAndPassword = async (email: string, password: string) : Promise<User | null> => {
  let user: User | null = null;
  console.log("Registering with email: ", email, " and password: ", password);
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential: UserCredential) => {
    // Signed in 
    user = userCredential.user;
    console.log("User Registered:");
  }).catch((error: any) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Error Code: ${errorCode} Error Message: ${errorMessage}`)
  });
  return user;
};

export const sendPasswordReset = async (email: string) : Promise<boolean> => {
  let success: boolean = false;
  try {
    await sendPasswordResetEmail(auth, email);
    success = true;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Error Code: ${errorCode} Error Message: ${errorMessage}`)
    let success = false;
  }
  return success;
};

export const logout = async () : Promise<boolean> => {
  let success: boolean = false;
  signOut(auth).then(() => {
    console.log("Logged out");
    success = true;
  }).catch((error: any) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Error Code: ${errorCode} Error Message: ${errorMessage}`)
    success = false;
  });
  return success;
};







const getUserName = () : string | null => {
  if (auth.currentUser) {
    return auth.currentUser.displayName;
  }
  return 'Anonymous';
}

export const postReading = async (reading: TReading) : Promise<string | null | undefined> => {
  await addDoc(collection(db, 'readings'), {
    name: getUserName(),
    ...reading,
    timestamp: serverTimestamp()
  }).then((docRef: DocumentReference<DocumentData>) => {
    console.log("Posted Reading")
    const docName: string = docRef.id;
    return docName;
  }).catch((error: any) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Error Code: ${errorCode} Error Message: ${errorMessage}`)
    return null
  });
}

export const getReading = async (id: string) : Promise<TReading | null | undefined> => {
  const docRef: DocumentReference<DocumentData> = doc(db, "readings", id);
  getDoc(docRef).then((docSnap: DocumentSnapshot<DocumentData>) => {
    if (docSnap.exists()) {
      const reading: TReading = docSnap.data() as TReading;
      console.log("Got Reading")
      return reading;
    } else {
      throw new Error(`No reading found with id: ${id}`);
    }
  }).catch((error: any) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Error Code: ${errorCode} Error Message: ${errorMessage}`)
    return null;
  });
}

export const getReadings = async () : Promise<TReading[] | null | undefined> => {
  const readings: TReading[] = [];
  // Create the query to load the last 12 messages and listen for new ones.
  const recentReadingsQuery: Query<DocumentData> = query(
    collection(getFirestore(), 'readings'), 
    orderBy('timestamp', 'desc'), 
    limit(12)
  );
  
  getDocs(recentReadingsQuery).then((querySnapshot: any) => {
    querySnapshot.forEach((doc: any) => {
      // doc.data() is never undefined for query doc snapshots
      readings.push({
        id: doc.id,
        hasSynced: true,
        ...doc.data()
      });
      console.log("Got Readings")
      return readings;
    }).catch((error: any) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error Code: ${errorCode} Error Message: ${errorMessage}`)
      return null;
    });
  });
}

export const doesDocExist = async (collectionName: string, docName: string) : Promise<boolean | null | undefined> => {
  const docRef: DocumentReference<DocumentData> = doc(db, collectionName, docName);
  getDoc(docRef).then((docSnap: DocumentSnapshot<DocumentData>) => {
    return !!docSnap.exists();
  }).catch((error: any) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Error Code: ${errorCode} Error Message: ${errorMessage}`)
    return null;
  });
}

export const getNews = async (id: string) : Promise<TNews | null |undefined> => {
  let news: TNews | null = null;
  const docRef: DocumentReference<DocumentData> = doc(db, "news", id);
  getDoc(docRef).then((docSnap: DocumentSnapshot<DocumentData>) => {
    if (docSnap.exists()) {
      news = docSnap.data() as TNews;
      console.log("Got News")
      return news;
    } else {
      throw new Error(`No news found with id: ${id}`);
    }
  }).catch((error: any) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Error Code: ${errorCode} Error Message: ${errorMessage}`)
    return null;
  });
}

/**
 * Gets all news from the database.
 * 
 * @returns {TNews[] | null | undefined} An array of news objects or null if there was an error.
 */
export const getAllNews = async () => {
  const news: TNews[] = [];
  const newsQuery = query(collection(getFirestore(), 'news'), orderBy('timestamp', 'desc'));
  getDocs(newsQuery).then((querySnapshot: any) => {
    querySnapshot.forEach((doc: DocumentSnapshot<DocumentData>) => {
      // doc.data() is never undefined for query doc snapshots
      const data: TNews = doc.data() as TNews;
      news.push({
        ...data,
      });
      console.log("Got News")
      return news;
    });
  }).catch((error: any) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Error Code: ${errorCode} Error Message: ${errorMessage}`)
    return null;
  });
}

export const postNews = async (): Promise<string | null | undefined> => {
  await addDoc(collection(db, 'news'), {
    title: "New News",
    author: "Admin",
    datetime: {
      date: "2021-05-01",
      time: "12:00:00"
    },
    description: "This is a new news article",
    contents: [
      {
        heading: "Heading 1",
        paragraphs: [
          "Nisi ex eiusmod est labore cillum ipsum ex. Nisi et qui labore veniam quis pariatur. Do cupidatat ad minim aliquip Lorem adipisicing exercitation proident laborum minim anim. Consequat non duis ipsum ipsum laboris excepteur proident sunt commodo anim. Amet fugiat do mollit adipisicing."
        ]
      },
      {
        heading: "Heading 2",
        paragraphs: [
          "Magna ullamco sit aliqua proident cillum culpa occaecat laboris proident ipsum deserunt laborum eiusmod ex. Aliquip dolor enim quis laborum deserunt occaecat ad ea consequat in do dolor aliquip. Cillum deserunt mollit cillum est anim quis proident ex ea. Nulla ut exercitation irure duis Lorem consectetur ad consequat ullamco. Sunt labore mollit et adipisicing sit consequat magna officia. Excepteur occaecat nisi aute consequat consequat qui aliqua magna officia.",
          "Cillum deserunt mollit cillum est anim quis proident ex ea. Nulla ut exercitation irure duis Lorem consectetur ad consequat ullamco. Sunt labore mollit et adipisicing sit consequat magna officia. Excepteur occaecat nisi aute consequat consequat qui aliqua magna officia."
        ]
      },
      {
        heading: "Heading 3",
        paragraphs: [
          "Tempor fugiat consectetur elit eiusmod exercitation do mollit commodo adipisicing tempor. Quis cillum esse id anim excepteur aliquip consequat aute labore id laboris. Exercitation laboris cupidatat pariatur aute irure ea laboris et mollit proident anim nostrud consequat voluptate."
        ]
      }
    ],
    timestamp: serverTimestamp()
  }).then((docRef) => {
    const docName: string = docRef.id;
    console.log("Posted Reading")
    return docName;
  }).catch((error: any) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Error Code: ${errorCode} Error Message: ${errorMessage}`)
    return null;
  });
}