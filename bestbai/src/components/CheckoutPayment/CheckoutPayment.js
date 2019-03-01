import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './CheckoutPayment.scss';
import CreditCardInput from 'react-credit-card-input';
import { PAYMENT_URL } from '../../resources/API_URL';
import { getData, postData } from '../../utils/API';
import { CHANGE_CHECKOUT_PAYMENT } from '../../redux/actions/cartActionTypes';
import PaymentCard from '../PaymentCard/PaymentCard';
import Cards from 'react-credit-cards';
import 'react-credit-cards/lib/styles.scss';

class CheckoutPayment extends Component {

  constructor() {
    super();
    this.state = {
      cardNumber: '',
      expiry: '',
      name: '',
      cvc: '',
      paymentCards: ''
    };
  }

  handleSubmit = () => {
    const card = {
      number: this.state.cardNumber,
      expirationDate: this.state.expiry,
      name: this.state.name,
      securityNumber: this.state.cvc
    };
    postData(PAYMENT_URL + '?userId=' + this.props.userId, card);
    this.props.changeCheckoutPayment(card);
    this.props.history.push('/checkout/placeorder');
  };

  submitCheckoutPayment = (props) => {
    props.changeCheckoutPayment(props.card);
    props.history.push('/checkout/placeorder');
  };

  componentDidMount() {
    const url = PAYMENT_URL + '?userId=' + this.props.userId;
    getData(url).then(res => {
      let paymentCards = res.content.map(card => <PaymentCard key={card.number} card={card} showCheckoutButton={true} submitCheckoutPayment={this.submitCheckoutPayment} />);
      if (paymentCards === undefined || paymentCards === 'undefined' || paymentCards.length === 0) {
        paymentCards = <p>You have no payment methods.</p>;
      }
      this.setState({
        paymentCards: paymentCards
      });
    });
  }

  render() {
    return (
      <div className='checkout-payment'>
        <h1 className='checkout-payment-title'>Checkout</h1>
        <h2 className='checkout-payment-subtitle'>Payment</h2>
        {this.state.paymentCards}
        <div className='checkout-payment-form'>
          <h4 className='checkout-payment-form-title'>or use a new address</h4>
          <div className='rccs-container'>
            <Cards
              number={this.state.cardNumber}
              name={this.state.name}
              expiry={this.state.expiry}
              cvc={this.state.cvc}
            />
          </div>
          <input className='checkout-payment-form-input' placeholder="Card holder's name" onChange={e => this.setState({ name: e.target.value })}></input>
          <CreditCardInput
            cardNumberInputProps={{ value: this.state.cardNumber, onChange: e => this.setState({ cardNumber: e.target.value }) }}
            cardExpiryInputProps={{ value: this.state.expiry, onChange: e => this.setState({ expiry: e.target.value }) }}
            cardCVCInputProps={{ value: this.state.cvc, onChange: e => this.setState({ cvc: e.target.value }) }}
            fieldClassName="input"
          />
          <button onClick={this.handleSubmit}>Use this payment method</button>
        </div>
      </div>
    );
  }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CheckoutPayment));
