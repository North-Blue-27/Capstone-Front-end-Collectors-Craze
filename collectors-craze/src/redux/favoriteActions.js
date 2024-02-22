export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

export const addFavorite = (gameName, cardId) => ({
  type: ADD_FAVORITE,
  payload: { gameName, cardId }
});

export const removeFavorite = (gameName, cardId) => ({
  type: REMOVE_FAVORITE,
  payload: { gameName, cardId }
});