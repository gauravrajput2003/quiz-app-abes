import React, { useContext, useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBytcQ9h_MkdQ5lZcUyvgn5Cb2nhtBmyyg",
  authDomain: "quizapp-6f6c9.firebaseapp.com",
  projectId: "quizapp-6f6c9",
  databaseURL: "https://quizapp-6f6c9-default-rtdb.firebaseio.com", // Use the Realtime Database URL here
  storageBucket: "quizapp-6f6c9.firebasestorage.app",
  messagingSenderId: "797470874934",
  appId: "1:797470874934:web:34a0bc28f38c06e1fde797",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Create the context
export const AuthContext = React.createContext();

// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  const value = { currentUser, signup, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export { app };
