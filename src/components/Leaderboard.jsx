import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Leaderboard() {
  const dispatch = useDispatch();
  const leaderboard = useSelector((state) => state.leaderboard.scores);
  const leaderboardStatus = useSelector((state) => state.leaderboard.status);
  const error = useSelector((state) => state.leaderboard.error);

  useEffect(() => {
    // If you want to fetch initial leaderboard, you can dispatch fetchLeaderboard here
    // dispatch(fetchLeaderboard());
  }, [dispatch]);

  if (leaderboardStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (leaderboardStatus === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Leaderboard</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Rank</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{entry.name}</td>
              <td className="px-4 py-2">{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
