import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CardVertical from '../CardVertical/CardVertical';
import PaymentCard from '../PaymentCard/PaymentCard';
import AddressCard from '../AddressBoard/AddressCard/AddressCard';
import swal from 'sweetalert';
import './CheckoutPlaceOrder.scss';
import { calculateSubtotal, placeOrder } from '../../services/CartService';
import { RESET_CART } from '../../redux/actions/cartActionTypes';
import io from 'socket.io-client';

export const socket = io.connect('http://localhost:3001');

class CheckoutPlaceOrder extends Component {
  constructor() {
    super();
    this.state = {
      cart: '',
      cartItems: '',
      checkoutPayment: '',
      deliveryAddress: '',
      subtotal: '',
      total: '',
      showWindow: false,
    };
  }
  componentDidMount() {
    const cartItems = this.props.cart.map(product => <CardVertical product={product} key={product.id} />);
    const checkoutPayment = <PaymentCard card={this.props.checkoutCard} showCheckoutButton={false} />;
    const deliveryAddress = <AddressCard address={this.props.deliveryAddress} showDeliverButton={false} />;
    const subtotal = calculateSubtotal(this.props.cart);
    const total = subtotal + 10;
    this.setState({
      cart: this.props.cart,
      cartItems: cartItems,
      checkoutPayment: checkoutPayment,
      deliveryAddress: deliveryAddress,
      subtotal: subtotal,
      total: total
    });
  }

  componentDidUpdate() {
    if (this.state.cart !== this.props.cart) {
      const cartItems = this.props.cart.map(product => <CardVertical product={product} key={product.id} />);
      this.setState({
        cart: this.props.cart,
        cartItems: cartItems
      });
    }
  }

  handleSubmitOrder(props) {
    placeOrder(this.props.cart, this.state.total, this.props.deliveryAddress, this.props.checkoutCard, this.props.userId)
      .then(res => {
        this.props.resetCart();
        swal({
          title: 'Order Succesful',
          text: 'Your order has been placed succesfully.',
          icon: 'success',
          button: 'Back to shopping!',
        }).then(res => {
          socket.emit('productsUpdate');
          this.props.history.push('/shop');
        });
      }
      );
  }

  render() {
    return (
      <div className='checkout-order-wrapper'>
        <h1 className='checkout-order-title'>Checkout</h1>
        <h2 className='checkout-order-subtitle'>Place Order</h2>
        <div className='checkout-order-container'>
          <div className='order-details'>
            {this.state.checkoutPayment}
            {this.state.deliveryAddress}
            <div className='order-summary'>
              <h4>Order Summary</h4>
              <p>Total items: {this.props.cart.length}</p>
              <p>Subtotal: ${this.state.subtotal}</p>
              <p>Shipping: $10</p>
              <p>Total: ${this.state.total}</p>
              <button className='place-order-button' onClick={() => this.handleSubmitOrder(this.props)}>Place Order</button>
            </div>
          </div>
          <div className='order-items'>
            <h4>Items</h4>
            {this.state.cartItems}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.login.userId,
  checkoutCard: state.cart.checkoutCard,
  cart: state.cart.cart,
  deliveryAddress: state.cart.deliveryAddress
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    resetCart: () => {
      dispatch({ type: RESET_CART });
    }
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CheckoutPlaceOrder));

