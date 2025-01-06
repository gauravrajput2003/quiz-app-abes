import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/trivia'); // Redirect to trivia page if already signed in
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/trivia');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
      style={{
        backgroundImage:
          "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs1lvbUuEEBQB40WmlGVqgi7sFydyzBl2omw&s')",
      }}
    >
      <div className="w-full max-w-md bg-black bg-opacity-75 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-white">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-lg font-bold mb-2 text-gray-300">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full p-3 border rounded-lg font-bold transition-transform transform hover:scale-105 bg-gray-700 text-white"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-bold mb-2 text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full p-3 border rounded-lg font-bold transition-transform transform hover:scale-105 bg-gray-700 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-transform transform hover:scale-105"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-300">
            New to A2Z Quiz App?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-red-500 font-bold hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;