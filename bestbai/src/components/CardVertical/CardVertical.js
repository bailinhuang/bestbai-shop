import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './CardVertical.scss';
import { connect } from 'react-redux';
import { ADD_TO_CART, DELETE_FROM_CART } from '../../redux/actions/cartActionTypes';
import { removeFromCart, editCartProduct } from '../../services/CartService';

function CardVertical (props) { 
  const { image, name, price, stock } = props.product;   
  const[quantity, setQuantity] = useState(props.product.quantity); 
  return (
    <div className="card-vertical">
      <div className="card-vertical-img-wrapper">
        <Link to='/'>
          <img src={image} alt={name}></img></Link>
      </div>
      {/* <div className='cardv-content'> */}
      <h4 className='cardv-title'>{name}</h4>
      <p className='card-price'>Price: ${price}</p>
      <p>Quantity:</p><input className='product-quantity-input' type='number' min='0' max={stock} value={quantity} 
        onChange={e => setQuantity(e.target.value)}
        onBlur={() => editCartProduct(props, quantity)}></input>
      <button className='cart-button' onClick={() => removeFromCart(props)}>Remove from cart</button>
      {/* </div> */}
    </div>
  );
}


const mapStateToProps = (state) => ({
  isLoggedIn: state.login.isLoggedIn,
  cart: state.cart.cart,
  userId: state.login.userId  
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    addToCart: (cart) => {
      dispatch({ type: ADD_TO_CART, cart});
    },
    
    deleteFromCart: (cart) => {
      dispatch({ type: DELETE_FROM_CART, cart});
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardVertical); 