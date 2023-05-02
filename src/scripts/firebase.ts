import {FirebaseApp, initializeApp} from 'firebase/app';
import {getAuth, Auth} from 'firebase/auth';
import {getFirestore, Firestore} from 'firebase/firestore';

/**
 * Firebase Config
 */
const firebaseConfig = {
  apiKey: 'AIzaSyDadX4nUbR726kQJliVIUYQblqXKAkeA84',
  authDomain: 'biodevices-without-borders-app.firebaseapp.com',
  projectId: 'biodevices-without-borders-app',
  storageBucket: 'biodevices-without-borders-app.appspot.com',
  messagingSenderId: '920197475483',
  appId: '1:920197475483:web:03db93df485491309e2a3e',
  measurementId: 'G-R1FY70VX68',
};

// Initialize Firebase
export const app: FirebaseApp = initializeApp(firebaseConfig);
// gets the auth service
export const auth: Auth = getAuth(app);
// gets the firestore database
export const db: Firestore = getFirestore(app);
