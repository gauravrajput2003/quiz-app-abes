// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import leaderboardReducer from './leaderboardSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    leaderboard: leaderboardReducer,
  },
});

export default store;
