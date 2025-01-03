const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    scores: [],
  },
  reducers: {
    addScoreToLeaderboard: (state, action) => {
      // Action payload should include both name and score
      state.scores.push(action.payload); 
    },
  },
});

export const { addScoreToLeaderboard } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
