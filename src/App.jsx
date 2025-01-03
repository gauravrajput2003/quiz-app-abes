// App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Trivia from './components/Trivia';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Leaderboard from './components/Leaderboard';
import PrivateRoute from './components/PrivateRoute';
import AboutUs from './components/AboutUs';
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
          <Route path="/about-us" element={<AboutUs />} /> {/* Add AboutUs route */}

          <Route path="/trivia" element={<PrivateRoute><Trivia /></PrivateRoute>} />
        </Routes>
      </div>
      <Footer/>
    </AuthProvider>
  );
}

function RedirectToHome() {
  const { currentUser } = useAuth();
  // If the user is logged in, redirect to trivia, else login page
  return currentUser ? <Navigate to="/trivia" /> : <Navigate to="/login" />;
}

export default App;
