import React, { Component } from 'react';
import { firebaseSignOut } from '../../utils/Firebase';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { USER_LOGOUT } from '../../redux/actions/sessionActionTypes';
import './AccountDashboard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class AccountDashboard extends Component {

  componentDidMount = () => {
  }

  signOut = () => {
    firebaseSignOut().then(res => {
      localStorage.clear();
      sessionStorage.clear();
      this.props.logoutUser();
    });
  }

  render() {
    return (
      <div className='account-dashboard'>
        <h2>Welcome {this.props.userName}</h2>
        <div className='account-config'>
          <div className='account-config-options'>
            <h3 className='config-option-title'>Orders</h3> 
            <Link to='/account/orders' className='account-config-link'>
              <FontAwesomeIcon icon='box' size='7x' />
            </Link> 
          </div>
          <div className='account-config-options'>
            <h3 className='config-option-title'>Addresses</h3>
            <Link to='/account/addresses' className='account-config-link'>
              <FontAwesomeIcon icon='map-marked-alt' size='7x' />
            </Link>
          </div>
          <div className='account-config-options'>
            <h3 className='config-option-title'>Payment</h3>
            <Link to='/account/payment' className='account-config-link'>
              <FontAwesomeIcon icon='credit-card' size='7x' />
            </Link>
          </div>
        </div>
        <button className='signout-button' onClick={this.signOut}>Sign Out</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
  userName: state.login.userName
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    logoutUser: () => {
      dispatch({ type: USER_LOGOUT });
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountDashboard));
