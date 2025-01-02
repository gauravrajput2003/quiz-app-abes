import { configureStore } from '@reduxjs/toolkit';
import leaderboardReducer from './leaderboardSlice';

const store = configureStore({
  reducer: {
    leaderboard: leaderboardReducer,
  },
});

export default store;
