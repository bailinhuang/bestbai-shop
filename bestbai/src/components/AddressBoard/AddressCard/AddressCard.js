import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './AddressCard.scss';
import { CHANGE_DELIVERY_ADDRESS } from '../../../redux/actions/cartActionTypes';

function AddressCard(props) { 
  const {id, zipcode, street, city, phone, province } = props.address;
  if (props.showDeliverButton === undefined) {
    props.showDeliverButton = false;
  }

  const handleSubmit = () => {
    props.addDeliveryAddress(props.address);
    props.history.push('/checkout/payment');
  };

  return (
    <div className='address-card'>
      <h4>Address</h4>
      <p>Zipcode: {zipcode}</p>
      <p>Street: {street}</p>
      <p>City: {city}</p>
      <p>Province: {province}</p>
      <p>Phone: {phone}</p>
      {!props.showDeliverButton &&
        <div className='address-card-tools'>
          <button>Edit</button>
          <button onClick={() => props.deleteAddress(props.userId, id)}>Delete</button>
        </div>}
      {props.showDeliverButton &&
        <button className='deliver-button' onClick={handleSubmit} >Deliver to this address</button>}
    </div>
  );
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddressCard));
