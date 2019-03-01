import { combineReducers } from 'redux'; 
import login from './sessionReducer';
import cart from './cartReducer';

const appReducer = combineReducers({ 
  login, cart
}); 

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;