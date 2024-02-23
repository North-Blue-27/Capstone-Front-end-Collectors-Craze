import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import favoriteReducer from './favoriteReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    favorites: favoriteReducer
  }
});

export default store;