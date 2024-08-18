// store/reducers/authReducer.js
const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
  };
  
  export default function authReducer(state = initialState, action) {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        localStorage.setItem('token', action.payload.token);
        return { ...state, user: action.payload.user, isAuthenticated: true, loading: false };
      case 'LOGOUT':
        localStorage.removeItem('token');
        return { ...state, user: null, token: null, isAuthenticated: false, loading: false };
      default:
        return state;
    }
  }
  