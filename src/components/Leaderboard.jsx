import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { resetLeaderboard } from '../assets/leaderboardSlice';
import { toPng } from 'html-to-image';

function Leaderboard() {
  const leaderboard = useSelector((state) => state.leaderboard.scores);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const leaderboardRef = useRef(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login'); // Redirect to login page if not logged in
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const sortedLeaderboard = [...leaderboard].sort((a, b) => b.score - a.score);

  const handleResetLeaderboard = () => {
    if (window.confirm('Are you sure you want to reset the leaderboard?')) {
      dispatch(resetLeaderboard());
    }
  };

  const getScoreStyle = (score) => {
    if (score === 0) return 'text-red-500 font-bold';
    if (score >= 8 && score <= 10) return 'text-green-500 font-bold';
    return 'text-black font-bold';
  };

  const handleDownloadImage = async () => {
    if (leaderboardRef.current) {
      const dataUrl = await toPng(leaderboardRef.current);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'leaderboard.png';
      link.click();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 relative">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage: `url('https://media.istockphoto.com/id/1150254184/photo/she-is-a-winner-excited-young-female-with-laptop-isolated-on-yellow-background.jpg?s=612x612&w=0&k=20&c=shfuNDbnLg8HBES58XkBiJLy9YOp8qnSrKt766ZJTUA=')`,
        }}
      ></div>
      <div className="relative bg-white bg-opacity-90 p-4 md:p-6 rounded-lg shadow-lg w-full max-w-3xl mx-4">
        <h2 className="text-2xl md:text-3xl text-center mb-4 md:mb-6 font-extrabold">
          Leaderboard
        </h2>
        {leaderboard.length === 0 ? (
          <p className="text-black text-center">No scores available yet.</p>
        ) : (
          <div
            ref={leaderboardRef}
            className="bg-white p-4 rounded-lg shadow-md overflow-x-auto"
          >
            <table className="w-full table-auto text-black">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left font-bold text-lg md:text-2xl">Rank</th>
                  <th className="px-4 py-2 text-left font-bold text-lg md:text-2xl">Username</th>
                  <th className="px-4 py-2 text-left font-bold text-lg md:text-2xl">Score</th>
                </tr>
              </thead>
              <tbody>
                {sortedLeaderboard.map((entry, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-base md:text-3xl text-black font-semibold">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 font-bold text-black text-base md:text-xl">
                      {entry.name}
                    </td>
                    <td
                      className={`px-4 py-2 text-base md:text-2xl ${getScoreStyle(
                        entry.score
                      )}`}
                    >
                      {entry.score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="flex flex-col md:flex-row md:space-x-4 mt-4 space-y-4 md:space-y-0">
          <button
            onClick={handleResetLeaderboard}
            className="bg-red-500 text-white px-4 md:px-6 py-2 rounded hover:bg-red-600"
          >
            Reset Leaderboard
          </button>
          <button
            onClick={handleDownloadImage}
            className="bg-blue-500 text-white px-4 md:px-6 py-2 rounded hover:bg-blue-600"
          >
            Download Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;