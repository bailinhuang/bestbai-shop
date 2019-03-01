import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Cart.scss';
import { ADD_TO_CART } from '../../redux/actions/cartActionTypes';
import CardVertical from '../CardVertical/CardVertical';
import { calculateSubtotal } from '../../services/CartService'; 

function Cart(props) {

  let cartItems = <p>Oh no, there's nothing here!</p>;
  const { cart } = props.cart;
  if (cart.length > 0) {
    cartItems = cart.map(product => <CardVertical product={product} />);
  }
  const subTotal = calculateSubtotal(cart);
  return (
    <div className='cart-wrapper'>
      <h1 className='cart-title'>Cart</h1>
      <div className='cart-container'>
        <div className='cart-list'>
          <h2 className='cart-title'>List</h2>
          {cartItems}
        </div>
        <div className='cart-tools'>
          <h4 className='cart-title'>Subtotal</h4>
          <p>${subTotal}</p>
          {cart.length > 0 ?
            <button className='cart-tools-addToCart' onClick={() => props.history.push('/buy/address')}>Proceed to checkout</button>
            : <p>Add products to proceed to checkout.</p>
          }
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    addToCart: (product) => {
      dispatch({ type: ADD_TO_CART, product });
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));