import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Leaderboard from './components/Leaderboard';
import Trivia from './components/Trivia';
import AboutUs from './components/AboutUs';
import './index.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/about-us" element={<AboutUs />} /> {/* Update the path */}
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/trivia" element={<Trivia />} />
        <Route path="/" element={<Trivia />} />
      </Routes>
      <Footer /> {/* Add Footer component */}
    </>
  );
}

export default App;