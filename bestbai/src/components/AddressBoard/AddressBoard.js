import React from 'react';
import './AddressBoard.scss';
import { withRouter } from 'react-router-dom';
import AddressCard from './AddressCard/AddressCard';  

function AddressBoard(props) { 
  let addressList = <></>;
  if (props.addresses !== undefined) {
    addressList = props.addresses.map(address =>
      <AddressCard
        key={address.id}
        address={address}
        userId={props.props.userId}
        deleteAddress={props.deleteAddress}
        showDeliverButton={props.showDeliverButton}
        addDeliveryAddress={props.addDeliveryAddress} />);
  }

  return (
    <div className='address-container'>
      <h2 className='address-container-title'>Shipping Addresses</h2>
      <div className='addressList-container'>
        {addressList}
      </div>
    </div>
  );
}

export default withRouter(AddressBoard);