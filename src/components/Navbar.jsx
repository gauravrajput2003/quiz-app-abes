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
      <button onClick={toggleMenu} className="text-white md:hidden">
        <i className="fas fa-bars"></i>
      </button>

      {/* Menu items */}
      <div className={`md:flex ${isMenuOpen ? 'block' : 'hidden'}`}>
        <Link to="/about-us" className="text-white md:ml-4">About Us</Link>
        {currentUser ? (
          <>
            <Link to="/trivia" className="text-white md:ml-4">Trivia</Link>
            <Link to="/leaderboard" className="text-white md:ml-4">Leaderboard</Link>
            <button onClick={logout} className="text-white md:ml-4">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white md:ml-4">Login</Link>
            <Link to="/signup" className="text-white md:ml-4">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;