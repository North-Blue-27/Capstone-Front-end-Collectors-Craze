import { createSlice } from '@reduxjs/toolkit';

// Definisci lo stato iniziale
const initialState = {
  isLoggedIn: false,
  userData: null,
};

// Crea un slice per il reducer
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Azione per il login
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
    },
    // Azione per il logout
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
    },
  },
});

// Esporta le azioni del slice
export const { loginUser, logoutUser } = userSlice.actions;

// Esporta il reducer
export default userSlice.reducer;