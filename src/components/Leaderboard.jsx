// src/components/Leaderboard.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetLeaderboard } from '../assets/leaderboardSlice'; // Import reset action

function Leaderboard() {
  const leaderboard = useSelector((state) => state.leaderboard.scores);
  const dispatch = useDispatch(); // Dispatch to reset leaderboard

  const sortedLeaderboard = [...leaderboard].sort((a, b) => b.score - a.score);

  const handleResetLeaderboard = () => {
    if (window.confirm('Are you sure you want to reset the leaderboard?')) {
      dispatch(resetLeaderboard()); // Dispatch reset action
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <p>No scores available yet.</p>
      ) : (
        <table className="w-full table-auto mb-4">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Rank</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedLeaderboard.map((entry, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{entry.name}</td>
                <td className="px-4 py-2">{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button
        onClick={handleResetLeaderboard}
        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 mt-4"
      >
        Reset Leaderboard
      </button>
    </div>
  );
}

export default Leaderboard;
