import userReducer, { loginUser, logoutUser } from '../redux/userReducer';

describe('userReducer', () => {
  // Test per verificare se lo stato iniziale è corretto
  it('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual({
      isLoggedIn: false,
      userData: null,
    });
  });

  // Test per verificare l'azione loginUser
  it('should handle loginUser action', () => {
    const user = { id: 1, name: 'John', email: 'john@example.com' };
    expect(userReducer(undefined, loginUser(user))).toEqual({
      isLoggedIn: true,
      userData: user,
    });
  });

  // Test per verificare l'azione logoutUser
  it('should handle logoutUser action', () => {
    const initialState = {
      isLoggedIn: true,
      userData: { id: 1, name: 'John', email: 'john@example.com' },
    };
    expect(userReducer(initialState, logoutUser())).toEqual({
      isLoggedIn: false,
      userData: null,
    });
  });
});