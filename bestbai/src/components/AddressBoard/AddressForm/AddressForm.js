import React, { useState } from 'react';
import {connect } from 'react-redux';
import { postData } from '../../../utils/API';
import { ADDRESSES_URL } from '../../../resources/API_URL';
import { getUserAdresses } from '../../../services/AddressService';
import { CHANGE_DELIVERY_ADDRESS } from '../../../redux/actions/cartActionTypes';
import './AddressForm.scss';

function AddressForm(props) { 
  const [province, setProvince] = useState();
  const [city, setCity] = useState();
  const [street, setStreet] = useState();
  const [phone, setPhone] = useState();
  const [zipcode, setZipcode] = useState();

  const handleSubmit = event => {
    event.preventDefault();
    const address = {
      province: province,
      city: city,
      street: street,
      phone: phone,
      zipcode: zipcode
    }; 
    const url = ADDRESSES_URL + '?userId=' + props.userId;
    postData(url, address).then(res => getUserAdresses(props.userId)
      .then(res => { 
        props.addDeliveryAddress(address);
      }));
  }; 
  return (
    <div className='address-form-container'>
      <h3>Add new address</h3>
      <form className='address-form'>
        <label>Province</label>
        <input onChange={e => setProvince(e.target.value)} />
        <label>City</label>
        <input onChange={e => setCity(e.target.value)} />
        <label>Street</label>
        <input onChange={e => setStreet(e.target.value)} />
        <label>Phone</label>
        <input onChange={e => setPhone(e.target.value)} />
        <label>Zipcode</label>
        <input onChange={e => setZipcode(e.target.value)} />
        <button type='submit' onClick={handleSubmit} className='address-form-submitButton'>Add address</button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({ 
  userId: state.login.userId, 
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    addDeliveryAddress: (address) => {
      dispatch({ type: CHANGE_DELIVERY_ADDRESS , address });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);
