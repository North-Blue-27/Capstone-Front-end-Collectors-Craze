import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer'; // Importa il nuovo userReducer

const store = configureStore({
  reducer: {
    user: userReducer, // Aggiungi il nuovo userReducer come parte dello stato globale dello store
    // Altri eventuali reducer possono essere aggiunti qui
  },
});

export default store;