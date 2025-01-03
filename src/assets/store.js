// src/assets/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import leaderboardReducer from './leaderboardSlice'; // Assuming you have a leaderboard slice

const store = configureStore({
  reducer: {
    user: userReducer,
    leaderboard: leaderboardReducer,
  },
});

export default store;
