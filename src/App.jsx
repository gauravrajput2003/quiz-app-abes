import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Trivia from './components/Trivia';
import Navbar from './components/Navbar';
import Leaderboard from './components/Leaderboard';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider, useAuth } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div className="bg-custom">
        <Routes>
          <Route path="/" element={<RedirectToHome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/trivia" element={<PrivateRoute><Trivia /></PrivateRoute>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

function RedirectToHome() {
  const { currentUser } = useAuth();
  // If the user is logged in, redirect to trivia, else login page
  return currentUser ? <Navigate to="/trivia" /> : <Navigate to="/login" />;
}

export default App;
