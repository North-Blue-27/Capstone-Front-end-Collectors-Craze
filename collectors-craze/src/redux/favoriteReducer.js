import { ADD_FAVORITE, REMOVE_FAVORITE } from './favoriteActions';

const initialState = {
  favorites: []
};

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [
          ...state.favorites,
          {
            gameName: action.payload.gameName,
            cardId: action.payload.cardId,
            cardData: action.payload.cardData 
          }
        ]
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(
          fav =>
            !(fav.gameName === action.payload.gameName && fav.cardId === action.payload.cardId)
        )
      };
    default:
      return state;
  }
};

export default favoriteReducer;