export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

export const addFavorite = (gameName, cardId, cardData) => ({
  type: ADD_FAVORITE,
  payload: { gameName, cardId, cardData }
});

export const removeFavorite = (gameName, cardId) => ({
  type: REMOVE_FAVORITE,
  payload: { gameName, cardId }
});