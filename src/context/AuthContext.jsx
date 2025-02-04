import React, { useContext, useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { useDispatch } from 'react-redux';
import { setUser } from '../assets/userSlice';  // Redux action to set user data

const firebaseConfig = {
  apiKey: "AIzaSyBytcQ9h_MkdQ5lZcUyvgn5Cb2nhtBmyyg",
  authDomain: "quizapp-6f6c9.firebaseapp.com",
  projectId: "quizapp-6f6c9",
  databaseURL: "https://quizapp-6f6c9-default-rtdb.firebaseio.com",
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
  const [error, setError] = useState(null);  // State to hold error message
  const [successMessage, setSuccessMessage] = useState(null);  // State for success message
  const navigate = useNavigate();  // Hook to navigate
  const dispatch = useDispatch();  // Dispatch to Redux

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Sign up function with error handling and success message
  const signup = async (email, password, name) => {
    try {
      setError(null);  // Reset any previous errors
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user's profile with the name
      await user.updateProfile({ displayName: name });

      // Dispatch name to Redux
      dispatch(setUser({ name, email }));

      // Set success message and navigate after delay
      setSuccessMessage("Signup successful! Redirecting to login...");
      setTimeout(() => {
        navigate('/login');  // Redirect to login page after a short delay
      }, 2000);  // 2 seconds delay for the success message
    } catch (error) {
      console.error("Signup failed:", error.message);
      setError(error.message);  // Set error message to state
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Login successful! Redirecting to trivia...");
      setTimeout(() => {
        navigate('/trivia');  // Redirect to trivia page after successful login
      }, 2000);  // 2 seconds delay for the success message
    } catch (error) {
      console.error("Login failed:", error.message);
      setError(error.message);  // Set error message to state
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      dispatch(setUser({ name: '', email: '' }));  // Reset user in Redux
      navigate('/login');  // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error.message);
      setError(error.message);  // Set error message to state
    }
  };

  const value = { currentUser, signup, login, logout, error, successMessage };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export { app };