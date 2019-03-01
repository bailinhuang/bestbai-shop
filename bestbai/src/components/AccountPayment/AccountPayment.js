import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../CheckoutPayment/CheckoutPayment';
import CreditCardInput from 'react-credit-card-input';
import { PAYMENT_URL } from '../../resources/API_URL';
import { getData, postData, deleteData } from '../../utils/API';
import { CHANGE_CHECKOUT_PAYMENT } from '../../redux/actions/cartActionTypes';
import PaymentCard from '../PaymentCard/PaymentCard';
import Cards from 'react-credit-cards';
import 'react-credit-cards/lib/styles.scss';

class AccountPayment extends Component {

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
    postData(PAYMENT_URL + '?userId=' + this.props.userId, card)
      .then(res => this.getUserCards()); 
  };

  submitCheckoutPayment = (props) => {
    props.changeCheckoutPayment(props.card);
    props.history.push('/checkout/placeorder');
  };

  deleteCard = (props) => {
    const url = PAYMENT_URL + '?userId=' + this.props.userId + '&cardId=' + props.card.id;
    deleteData(url).then(
      res => this.getUserCards()
    );
  }

  componentDidMount() {
    this.getUserCards();
  }

  getUserCards = () => {
    const url = PAYMENT_URL + '?userId=' + this.props.userId;
    getData(url).then(res => {
      let paymentCards = res.content.map(card =>
        <PaymentCard key={card.number}
          card={card}
          showCheckoutButton={false}
          submitCheckoutPayment={this.submitCheckoutPayment}
          deleteCard={this.deleteCard} />);
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
        <h1 className='checkout-payment-title'>Payment Methods</h1>
        <h2 className='checkout-payment-subtitle'>Cards</h2>
        {this.state.paymentCards}
        <div className='checkout-payment-form'>
          <h4 className='checkout-payment-form-title'>Add a new card</h4>
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
          <button onClick={this.handleSubmit}>Add card</button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountPayment));
