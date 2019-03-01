import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Card.scss';
import { connect } from 'react-redux';
import { ADD_TO_CART } from '../../redux/actions/cartActionTypes';
import { addToCart } from '../../services/CartService';

class Card extends Component {
  render() {    
    const { image, name, price, stock, id } = this.props.product;
    const productURL = '/product/' + id ;
    let available = true;
    if(stock === 0){
      available = false;
    }
    return (
      <div className="card">
        <div className="card-img-wrapper">
          <Link to={productURL}>
            <img src={image} alt={name}></img></Link>
        </div>
        <div className='card-content'>
          <h4 className='card-title'>{name}</h4>
          <p className='card-price'>Price: ${price}</p>
          <p className='card-price'>Stock: {stock}</p>
          {available ? 
            <button className='cart-button' onClick={() => addToCart(this.props)}>Add to cart</button>
            : <p>Not available</p>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.login.isLoggedIn,
  cart: state.cart.cart
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    addToCart: (cart) => {
      dispatch({ type: ADD_TO_CART, cart});
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Card); 