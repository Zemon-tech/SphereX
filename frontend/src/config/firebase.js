import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCAXMTSH1G4youdyRT_5he6DCOOrLH4whI",
  authDomain: "ver-1-7a8c3.firebaseapp.com",
  projectId: "ver-1-7a8c3",
  storageBucket: "ver-1-7a8c3.firebasestorage.app",
  messagingSenderId: "361864418657",
  appId: "1:361864418657:web:b3f1f87fa7e3c188cc2120"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth and Storage instances
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app; 