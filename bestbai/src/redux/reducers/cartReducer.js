import { ADD_TO_CART, DELETE_FROM_CART, CHANGE_DELIVERY_ADDRESS, CHANGE_CHECKOUT_PAYMENT, RESET_CART } from '../actions/cartActionTypes';

const initialState = {
  cart: [],
  deliveryAddress: '',
  checkoutCard: ''
};

export default function (state = initialState, action) {
  let newCart = [...state.cart];
  switch (action.type) {
  case ADD_TO_CART:
    newCart = [...action.cart];
    return Object.assign(
      {},
      state, {
        cart: newCart
      });
  case DELETE_FROM_CART:
    newCart = [...action.cart];
    return Object.assign(
      {},
      state, {
        cart: newCart
      });
  case CHANGE_DELIVERY_ADDRESS:
    return Object.assign(
      {},
      state, {
        deliveryAddress: action.address
      });
  case RESET_CART:
    return Object.assign(
      {},
      state, {
        cart: []
      });
  case CHANGE_CHECKOUT_PAYMENT:
    return Object.assign(
      {},
      state, {
        checkoutCard: action.checkoutCard
      });
  default:
    return state;
  }
}