import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AddressBoard from '../AddressBoard/AddressBoard';
import { getUserAdresses } from '../../services/AddressService';
import { CHANGE_DELIVERY_ADDRESS } from '../../redux/actions/cartActionTypes';
import AddressForm from '../AddressBoard/AddressForm/AddressForm';
import './CheckoutAddressBoard.scss';

class CheckoutAddressBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
      showLoader: true
    };
  }

  componentDidMount() {
    getUserAdresses(this.props.userId).then(res => {
      this.setState({
        addresses: res.content
      });
    });
  }

  componentDidUpdate() {
    getUserAdresses(this.props.userId).then(res => {
      this.setState({
        addresses: res.content
      });
    });
  }


  updateAddressBoard(userId) {
    getUserAdresses(userId).then(res => {
      this.setState({
        addresses: res.content
      });
    });
  }

  addDeliveryAddress(address) {
    this.props.addDeliveryAddress(address);
    this.props.push('/checkout/payment');
  }

  render() {
    let showDeliverButton = false;
    if (this.props.location.pathname === '/buy/address') {
      showDeliverButton = true;
    }
    return (
      <div className='checkoutAddressBoard'>
        {showDeliverButton ? <h1>Checkout</h1> : <h1>Your addresses</h1>}
        <AddressBoard 
          props={this.props}
          addresses={this.state.addresses}
          showDeliverButton={showDeliverButton} />
        <AddressForm updateAddressBoard={this.updateAddressBoard} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
  userEmail: state.login.userEmail,
  userId: state.login.userId,
  userName: state.login.userName
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    addDeliveryAddress: (address) => {
      dispatch({ type: CHANGE_DELIVERY_ADDRESS, address });
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CheckoutAddressBoard));
