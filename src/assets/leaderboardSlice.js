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
      // Add new score to the leaderboard
      state.scores.push(action.payload);
      // Sort leaderboard by score in descending order
      state.scores.sort((a, b) => b.score - a.score);
      // Save updated leaderboard to localStorage
      saveToLocalStorage(state.scores);
    },
  },
});

export const { addScoreToLeaderboard } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
