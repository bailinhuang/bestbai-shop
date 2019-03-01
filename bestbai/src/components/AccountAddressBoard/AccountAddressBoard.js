import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AddressBoard from '../AddressBoard/AddressBoard';
import { getUserAdresses } from '../../services/AddressService';
import { CHANGE_DELIVERY_ADDRESS } from '../../redux/actions/cartActionTypes';
import AddressForm from '../AddressBoard/AddressForm/AddressForm';
import '../CheckoutAddressBoard/CheckoutAddressBoard';
import { ADDRESSES_URL } from '../../resources/API_URL';
import { deleteData } from '../../utils/API';

class AccountAddressBoard extends Component {

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
      if (this.state.addresses !== res.content && res.content.length !== 0 && this.state.addresses.length !== 0) {
        this.setState({
          addresses: res.content
        });
      }
    });
  }


  updateAddressBoard = (userId) => {
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

  deleteAddress = (userId, addressId) => {
    const url = ADDRESSES_URL + '/' + userId + '/' + addressId;
    deleteData(url).then(res => this.updateAddressBoard(userId));
  };


  render() {
    let showDeliverButton = false;
    return (
      <div className='checkoutAddressBoard'>
        {showDeliverButton ? <h1>Checkout</h1> : <h1>Your addresses</h1>}
        <AddressBoard
          props={this.props}
          deleteAddress={this.deleteAddress}
          updateAddressBoard={this.updateAddressBoard}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountAddressBoard));
