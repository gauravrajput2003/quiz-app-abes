import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center shadow-lg">
      <Link to="/" className="text-white text-2xl font-bold">A2Z App</Link>

      {/* Mobile menu toggle button */}
      <button
        onClick={toggleMenu}
        className="text-white md:hidden focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      {/* Navbar links */}
      <div className={`flex space-x-4 items-center ${isMenuOpen ? 'block' : 'hidden'} md:flex md:space-x-6`}>
        {currentUser ? (
          <>
            <Link to="/trivia" className="text-white hover:bg-blue-700 px-4 py-2 rounded transition-all">Home</Link>
            <Link to="/leaderboard" className="text-white hover:bg-blue-700 px-4 py-2 rounded transition-all">Leaderboard</Link>
            <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded ml-4 hover:bg-red-700 transition-all">Logout</button>
          </>
        ) : (
          <>
            <Link to="/" className="text-white hover:bg-blue-700 px-4 py-2 rounded transition-all">Home</Link>
            <Link to="/login" className="text-white hover:bg-blue-700 px-4 py-2 rounded transition-all">Login</Link>
            <Link to="/signup" className="text-white hover:bg-blue-700 px-4 py-2 rounded transition-all">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
