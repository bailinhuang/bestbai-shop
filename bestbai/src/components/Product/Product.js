import React, { Component } from 'react';
import { getProduct, getProducts, getProductsByCategory } from '../../services/ProductService';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Product.scss';
import Loader from '../Loader/Loader';
import io from 'socket.io-client';
import { ADD_TO_CART } from '../../redux/actions/cartActionTypes';
import { addToCart, addToCartV2 } from '../../services/CartService';
export const socket = io.connect('http://localhost:3001');

class Product extends Component {

  constructor() {
    super();
    this.state = {
      id: '',
      name: '',
      price: '',
      description: '',
      category: '',
      image: '',
      recommendations: '',
      showLoader: true
    };
  }

  fetchProduct = () => {
    getProduct(this.props.match.params.id).then(res => {
      const { id, name, price, description, category, image, stock } = res.content;
      this.setState({
        id: id,
        name: name,
        price: price,
        description: description,
        category: category,
        image: image,
        stock: stock
      });
    }).then(res => getProductsByCategory(this.state.category, 0, 5)
      .then(res => {
        const recommendations = res.content.content.map(product => ProductRecommendationCards(product));
        this.setState({
          recommendations: recommendations
        });
      }));
    this.setState({
      showLoader: false
    });
  }

  componentDidMount() {
    this.fetchProduct();
    socket.on('productsUpdate', () => {
      this.fetchProduct();
    });

  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.fetchProduct();
    }
  }

  handleAdd = () => { 
    const { name, price, description, image, stock } = this.state;
    const product = { 
      name: name,
      price: price,
      description: description,
      image: image,
      stock: stock
    };
    const props = this.props; 
    addToCartV2(props, product);
  }

  render() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 4,
      initialSlide: 0,
      Slide: 2

    };
    const { name, price, description, image, stock } = this.state;
    let availability = stock;
    if (stock === undefined || stock === 'undefined' || stock === 0) {
      availability = 'Sold out';
    }
    return (
      <>
        {!this.state.showLoader ?
          <div className='product'>
            <div className='product-content'>
              <div className='img-container'>
                <img alt={name} src={image}></img>
              </div>
              <div className='product-information'>
                <h2 className='product-name'>{name}</h2>
                <p>Price: ${price}</p>
                <p>Stock: {availability}</p>
                <button className='product-details-add-button' onClick={this.handleAdd} >Add to cart</button>
                <p>Description:</p>
                <p className='product-description'>{description}</p>
              </div>
            </div>
            <div className='product-recommendations'>
              <h4>See also</h4>
              <div className='product-recomm-list'>
                {this.state.recommendations}
              </div>
            </div>
          </div>
          : <Loader />
        }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.login.isLoggedIn,
  cart: state.cart.cart,
  userId: state.login.userId
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    addToCart: (cart) => {
      dispatch({ type: ADD_TO_CART, cart });
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Product);
const ProductRecommendationCards = (product) => {
  const url = '/product/' + product.id;
  return (
    <div className='product-recomm-card'>
      {product.name}
      <Link to={url}>
        <img className='prod-recomm-img' alt={product.name} src={product.image}></img></Link>
    </div>
  );
};