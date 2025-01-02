import { createSlice } from '@reduxjs/toolkit';

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    scores: [],
  },
  reducers: {
    addScoreToLeaderboard: (state, action) => {
      state.scores.push(action.payload); // Add the new score to the leaderboard
    },
  },
});

export const { addScoreToLeaderboard } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
