import {FirebaseApp, initializeApp} from 'firebase/app';
import {getAuth, Auth} from 'firebase/auth';
import {Firestore, initializeFirestore} from 'firebase/firestore';

/**
 * Firebase Config
 */
const firebaseConfig = {
  apiKey: 'AIzaSyDadX4nUbR726kQJliVIUYQblqXKAkeA84',
  authDomain: 'biodevices-without-borders-app.firebaseapp.com',
  projectId: 'biodevices-without-borders-app',
  storageBucket: 'biodevices-without-borders-app.appspot.com',
  messagingSenderId: '920197475483',
  appId: '1:920197475483:web:3978fe34e9ff5aef9e2a3e',
  measurementId: 'G-WXH3NQ82QZ',
};

// Initialize Firebase
export const app: FirebaseApp = initializeApp(firebaseConfig);
// gets the auth service
export const auth: Auth = getAuth(app);
// gets the firestore database
export const db: Firestore = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
