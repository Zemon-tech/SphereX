import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Obfuscate config by using environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize in a way that prevents config exposure
const initFirebase = () => {
  try {
    return initializeApp(firebaseConfig);
  } catch (error) {
    console.error('Firebase initialization error:', error.message);
    return null;
  }
};

// Initialize Firebase
const app = initFirebase();

// Get Auth and Storage instances
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app; 