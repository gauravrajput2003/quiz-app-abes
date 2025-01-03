// src/redux/leaderboardSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Load leaderboard from localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('leaderboard');
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (err) {
    console.error('Could not load leaderboard from localStorage', err);
    return [];
  }
};

// Save leaderboard to localStorage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('leaderboard', serializedState);
  } catch (err) {
    console.error('Could not save leaderboard to localStorage', err);
  }
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    scores: loadFromLocalStorage(),
  },
  reducers: {
    addScoreToLeaderboard: (state, action) => {
      state.scores.push(action.payload);
      state.scores.sort((a, b) => b.score - a.score); // Sort by score
      saveToLocalStorage(state.scores); // Save updated leaderboard
    },
    resetLeaderboard: (state) => {
      state.scores = [];
      saveToLocalStorage(state.scores); // Clear leaderboard from localStorage
    },
  },
});

export const { addScoreToLeaderboard, resetLeaderboard } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
