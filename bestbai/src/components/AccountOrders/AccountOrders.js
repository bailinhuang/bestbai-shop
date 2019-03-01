import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getData } from '../../utils/API';
import { PLACEORDER_URL } from '../../resources/API_URL';
import OrderCard from '../OrderCard/OrderCard';
import './AccountOrders.scss';

class AccountOrders extends Component {

  constructor() {
    super();
    this.state = {
      orders: []
    };
  }

  componentDidMount = () => {
    getData(PLACEORDER_URL + '?userId=' + this.props.userId)
      .then(res => {
        console.log(res);
        this.setState({
          orders: res.content
        });
      });
  }

  render() {
    const orders = this.state.orders.map(order => <OrderCard order={order}/>);
    return (
      <div className='account-order-container'>
        <h1>Orders</h1>
        <div className='order-cards-container'>
          {orders}
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
  userId: state.login.userId
});

const mapDispatchToProps = (dispatch, props) => {
  return {

  };
};

export default withRouter(connect(mapStateToProps, null)(AccountOrders));
