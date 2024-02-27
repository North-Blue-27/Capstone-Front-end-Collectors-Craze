import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userData: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
    },
    updateUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { loginUser, logoutUser, updateUserData } = userSlice.actions;
export default userSlice.reducer;