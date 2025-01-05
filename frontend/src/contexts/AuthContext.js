import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import api from '../services/api';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      throw error;
    }
  };

  const loginWithGithub = async () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logout = () => {
    return signOut(auth);
  };

  const isAdminEmail = (email) => {
    const adminEmails = ['shivangkandoi@gmail.com']; // Same email as backend
    return adminEmails.includes(email);
  };

  const updateUserProfile = async (profileData) => {
    if (!currentUser) return;
    
    try {
      // Update Firebase auth profile
      if (profileData.displayName || profileData.photoURL) {
        await updateProfile(currentUser, {
          displayName: profileData.displayName || currentUser.displayName,
          photoURL: profileData.photoURL || currentUser.photoURL
        });
      }
      return true;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  const createUserInDB = async (user) => {
    try {
      await api.post('/users', {
        email: user.email,
        name: user.displayName || '',
        firebaseUid: user.uid
      });
    } catch (error) {
      // If user already exists, that's fine
      if (error.response?.status !== 400) {
        console.error('Error creating user in DB:', error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);
        setIsAdmin(isAdminEmail(user.email));
        await createUserInDB(user);
      } else {
        setCurrentUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isAdmin,
    signup,
    login,
    loginWithGoogle,
    loginWithGithub,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 