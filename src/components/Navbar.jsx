import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu visibility for mobile view
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="p-4 flex justify-between items-center shadow-xl rounded-b-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      {/* App Logo */}
      <Link to="/" className="text-white text-2xl font-bold">
        A2Z App
      </Link>

      {/* Mobile menu toggle button */}
      <button onClick={toggleMenu} className="text-white md:hidden">
        <i className="fas fa-bars"></i>
      </button>

      {/* Menu items */}
      <div className={`md:flex ${isMenuOpen ? 'block' : 'hidden'} md:items-center`}>
        {/* Home link (visible to all users) */}
        <NavLink
          to="/trivia"
          className="text-white md:ml-4 font-semibold hover:text-yellow-400 transition-all duration-300 text-2xl"
        >
          Home
        </NavLink>

        {/* About Us */}
        <NavLink
          to="/about-us"
          className="text-white md:ml-4 font-semibold hover:text-yellow-400 transition-all duration-300 text-2xl"
        >
          About Us
        </NavLink>

        {/* Leaderboard (visible to all users) */}
        <NavLink
          to="/leaderboard"
          className="text-white md:ml-4 font-semibold hover:text-yellow-400 transition-all duration-300 text-2xl"
        >
          Leaderboard
        </NavLink>

        {currentUser ? (
          <>
            {/* Logout */}
            <button
              onClick={logout}
              className="text-white md:ml-4 font-semibold hover:text-yellow-400 transition-all duration-300 text-2xl"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Login */}
            <NavLink
              to="/login"
              className="text-white md:ml-4 font-semibold hover:text-yellow-400 transition-all duration-300 text-2xl"
            >
              Login
            </NavLink>
            {/* Signup */}
            <NavLink
              to="/signup"
              className="text-white md:ml-4 font-semibold hover:text-yellow-400 transition-all duration-300 text-2xl"
            >
              Signup
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;