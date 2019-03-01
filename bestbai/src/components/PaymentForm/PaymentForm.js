import React, { useState } from 'react';
import { connect } from 'react-redux'; 
import CreditCardInput from 'react-credit-card-input';
import { ADDRESSES_URL, PAYMENT_URL } from '../../resources/API_URL';
import { postData } from '../../utils/API';
import { getUserAdresses } from '../../services/AddressService';
import { CHANGE_DELIVERY_ADDRESS } from '../../redux/actions/cartActionTypes';
import './PaymentForm.scss';

function PaymentForm(props) {
  const [cardNumber, setCardNumber] = useState();
  const [expiry, setExpiry] = useState();
  const [name, setName] = useState();
  const [cvc, setCVC] = useState();

  const handleSubmit = event => {
    event.preventDefault();
    const card = { 
      number: cardNumber,
      expirationDate: expiry,
      name: name,
      securityNumber: cvc
    };
    const url = PAYMENT_URL + '?userId=' + props.userId;
    postData(url, card).then(res => getUserAdresses(props.userId).then(res => console.log(res)));
  };
  return (
    <div className='payment-form'>
      <input placeholder="Card holder's name" onChange={e => setName(e.target.value)}></input>
      <CreditCardInput
        cardNumberInputProps={{ value: cardNumber, onChange: e => setCardNumber(e.target.value)}}
        cardExpiryInputProps={{ value: expiry, onChange: e => setExpiry(e.target.value) }}
        cardCVCInputProps={{ value: cvc, onChange: e => setCVC(e.target.value) }}
        fieldClassName="input"
      />
      <button onClick={handleSubmit}>Use this payment method</button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userId: state.login.userId,
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    addDeliveryAddress: (address) => {
      dispatch({ type: CHANGE_DELIVERY_ADDRESS, address });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm);
