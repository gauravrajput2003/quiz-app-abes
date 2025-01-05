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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h2 className="text-4xl font-extrabold text-center mb-8">Leaderboard</h2>
      <div ref={leaderboardRef} className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedLeaderboard.map((entry, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{entry.name}</td>
                <td className={`border px-4 py-2 ${getScoreStyle(entry.score)}`}>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col sm:flex-row justify-center mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          onClick={handleResetLeaderboard}
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
        >
          Reset Leaderboard
        </button>
        <button
          onClick={handleShareImage}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Share Leaderboard
        </button>
      </div>
    </div>
  );
}

export default Leaderboard;