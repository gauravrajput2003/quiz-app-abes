import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetLeaderboard } from '../assets/leaderboardSlice'; // Import reset action
import { toPng } from 'html-to-image';

function Leaderboard() {
  const leaderboard = useSelector((state) => state.leaderboard.scores);
  const dispatch = useDispatch(); // Dispatch to reset leaderboard
  const leaderboardRef = useRef(null); // Ref for the leaderboard

  const sortedLeaderboard = [...leaderboard].sort((a, b) => b.score - a.score);

  const handleResetLeaderboard = () => {
    if (window.confirm('Are you sure you want to reset the leaderboard?')) {
      dispatch(resetLeaderboard()); // Dispatch reset action
    }
  };

  const getScoreStyle = (score) => {
    if (score === 0) return 'text-red-500 font-bold';
    if (score >= 8 && score <= 10) return 'text-green-500 font-bold';
    return 'text-black font-bold';
  };

  const handleShareImage = async () => {
    if (leaderboardRef.current) {
      try {
        const dataUrl = await toPng(leaderboardRef.current);
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], 'leaderboard.png', { type: blob.type });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'Leaderboard',
            text: 'Check out this leaderboard!',
          });
        } else {
          alert('Your browser does not support direct image sharing.');
        }
      } catch (error) {
        console.error('Error sharing image:', error);
      }
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
      <div className="bg-opacity-10 bg-white p-6 rounded-lg">
        <h2 className="text-3xl text-center mb-6 font-extrabold">Leaderboard</h2>
        {leaderboard.length === 0 ? (
          <p className="text-white">No scores available yet.</p>
        ) : (
          <div ref={leaderboardRef} className="bg-white p-4 rounded-lg shadow-md">
            <table className="w-full table-auto mb-4 text-black">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left font-bold text-2xl">Rank</th>
                  <th className="px-4 py-2 text-left font-bold text-2xl">Username</th>
                  <th className="px-4 py-2 text-left font-bold text-2xl">Score</th>
                </tr>
              </thead>
              <tbody>
                {sortedLeaderboard.map((entry, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-3xl text-black font-semibold">{index + 1}</td>
                    <td className="px-4 py-2 font-bold text-black text-xl">{entry.name}</td>
                    <td className={`px-4 py-2 text-2xl ${getScoreStyle(entry.score)}`}>
                      {entry.score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="flex space-x-4 mt-4">
          <button
            onClick={handleResetLeaderboard}
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
          >
            Reset Leaderboard
          </button>
          <button
            onClick={handleShareImage}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Share Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
