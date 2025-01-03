import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // State to track success
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Signup form submitted'); // Debugging log
    try {
      const userCredential = await signup(email, password);
      console.log('User credential:', userCredential); // Debugging log

      const user = userCredential.user;
      await updateProfile(user, {
        displayName: name,
      });
      console.log('User profile updated with name:', name); // Debugging log

      setSuccess(true); // Set success to true
      setError(''); // Clear any previous error

      // Redirect to sign-in after 3 seconds
      setTimeout(() => {
        console.log('Redirecting to sign-in page'); // Debugging log
        navigate('/signin');
      }, 3000);
    } catch (err) {
      console.error('Signup error:', err); // Debugging log
      setError('Failed to create an account. Please try again.');
      setSuccess(false); // Ensure success is false
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://assets.nflxext.com/ffe/siteui/vlv3/8b7d1c2b-4a3d-4f8e-8b2e-3e8b1b8e8b1b/8b7d1c2b-4a3d-4f8e-8b2e-3e8b1b8e8b1b_US-en-20210913-popsignuptwoweeks-perspective_alpha_website_large.jpg')",
      }}
    >
      <div className="bg-black bg-opacity-75 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Sign Up</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        {success && (
          <div className="mb-4 text-green-500">
            Signup successful! Redirecting to sign-in...
          </div>
        )}
        {!success && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full p-2 border rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full p-2 border rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full p-2 border rounded bg-gray-700 text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
            >
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Signup;
