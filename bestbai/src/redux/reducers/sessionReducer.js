import {LOGIN, LOGOUT} from '../actions/sessionActionTypes';

const initialState = {
  isLoggedIn: false,
  userId: '',
  userEmail: '',
  userName: 'Login'
};

export default function (state = initialState, action) { 
  switch (action.type) {
  case LOGIN: 
    return Object.assign(
      {},
      state, {
        userId: action.userId,
        userEmail: action.userEmail,
        userName: action.userName,
        isLoggedIn: true
      });
  case LOGOUT:
    return Object.assign(
      {},
      state, {
        isLoggedIn: false
      });
  default:
    return state;
  }
}