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
    <div
      className="p-6 max-w-3xl mx-auto bg-cover bg-center rounded-lg"
      style={{
        backgroundImage: `url('https://media.istockphoto.com/id/1150254184/photo/she-is-a-winner-excited-young-female-with-laptop-isolated-on-yellow-background.jpg?s=612x612&w=0&k=20&c=shfuNDbnLg8HBES58XkBiJLy9YOp8qnSrKt766ZJTUA=')`,
        height: '100vh', // Ensures the background image covers the full screen height
      }}
    >
      <div className="bg-opacity-20 bg-white p-6 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6  text-blue-600">Leaderboard</h2>
        {leaderboard.length === 0 ? (
          <p className="text-white">No scores available yet.</p>
        ) : (
          <table className="w-full table-auto mb-4 text-white">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left font-bold  text-3xl">Rank</th>
                <th className="px-4 py-2 text-left font-bold text-2xl">Name</th>
                <th className="px-4 py-2 text-left font bold text-xl">Score</th>
              </tr>
            </thead>
            <tbody>
              {sortedLeaderboard.map((entry, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 text-2xl text-black font-semibold">{index + 1}</td>
                  <td className="px-4 py-2 font-bold text-black text-xl">{entry.name}</td>
                  <td className="px-4 py-2 text-2xl font-bold text-white">{entry.score}</td>
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
    </div>
  );
}

export default Leaderboard;
