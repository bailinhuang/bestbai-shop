import React from 'react';
import './PaymentCard.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CHANGE_CHECKOUT_PAYMENT } from '../../redux/actions/cartActionTypes';

function PaymentCard(props) {

  let showButton = false;
  if (props.showCheckoutButton === undefined) {
    showButton = false;
  } else if (props.showCheckoutButton === true) {
    showButton = true;
  }
  const { name, number, expirationDate } = props.card;
  const censoredNumber = number.substring(number.length - 4, number.length);
  return (
    <div className='payment-card'>
      <h4 className='payment-card-title'>{name}'s card</h4>
      <p>Card ending with {censoredNumber}</p>
      <p>Expires on {expirationDate} </p>
      {showButton ? <button className='payment-checkout-button'
        onClick={() => props.submitCheckoutPayment(props)}>Use this card</button>
        : <button className='payment-checkout-button'
          onClick={() => props.deleteCard(props)}>Delete</button>}
    </div>
  );
}

const mapStateToProps = (state) => ({
  userId: state.login.userId,
  checkoutCard: state.checkoutCard
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    changeCheckoutPayment: (checkoutCard) => {
      dispatch({ type: CHANGE_CHECKOUT_PAYMENT, checkoutCard });
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentCard));
