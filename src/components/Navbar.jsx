import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu visibility for mobile view
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-xl rounded-b-xl">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* App Logo */}
        <Link to="/" className="text-white text-3xl font-extrabold tracking-wide">
          A2Z<span className="text-yellow-400">App</span>
        </Link>

        {/* Mobile menu toggle button */}
        <button
          onClick={toggleMenu}
          className="text-white text-2xl md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/trivia"
            className="text-white text-lg font-semibold hover:text-yellow-400 transition duration-300"
          >
            Home
          </NavLink>
          <NavLink
            to="/about-us"
            className="text-white text-lg font-semibold hover:text-yellow-400 transition duration-300"
          >
            Aboutus
          </NavLink>
          <NavLink
            to="/leaderboard"
            className="text-white text-lg font-semibold hover:text-yellow-400 transition duration-300"
          >
            Leaderboard
          </NavLink>
          {currentUser ? (
            <button
              onClick={logout}
              className="text-white text-lg font-semibold hover:text-yellow-400 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-white text-lg font-semibold hover:text-yellow-400 transition duration-300"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="text-white text-lg font-semibold hover:text-yellow-400 transition duration-300"
              >
                Signup
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-600 text-white space-y-4 px-4 py-4">
          <NavLink
            to="/trivia"
            className="block text-lg font-semibold hover:text-yellow-400 transition duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about-us"
            className="block text-lg font-semibold hover:text-yellow-400 transition duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Aboutus
          </NavLink>
          <NavLink
            to="/leaderboard"
            className="block text-lg font-semibold hover:text-yellow-400 transition duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Leaderboard
          </NavLink>
          {currentUser ? (
            <button
              onClick={logout}
              className="block text-lg font-semibold hover:text-yellow-400 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className="block text-lg font-semibold hover:text-yellow-400 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="block text-lg font-semibold hover:text-yellow-400 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Signup
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
