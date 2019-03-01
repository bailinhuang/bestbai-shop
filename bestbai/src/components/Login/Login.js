import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import './Login.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { LOGIN } from '../../redux/actions/sessionActionTypes';
import { getData } from '../../utils/API';
import { USER_URL } from '../../resources/API_URL';
import { firebaseSignOut } from '../../utils/Firebase';
import Loader from '../Loader/Loader';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      showLoader: true
    };
  }

  uiConfig = {
    signInFlow: 'redirect',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  }

  componentDidMount = () => {
    if (!this.props.isLoggedIn) {
      firebaseSignOut();
    } 
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.history.push('/');
        getData(USER_URL + user.email)
          .then(res => {
            const { name, id, email } = res.content;
            this.props.loginUser(name, id, email);
            this.setState({
              showLoader: false
            });
          })
          .catch(err => console.log(err));
      }
    });
    this.setState({
      showLoader: false
    });
  } 

  render() {
    return (
      <>
        {!this.state.showLoader &&
          <div className='login-container'>
            <h2>Login</h2>
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
            <Link to='/register'>Don't have an account?</Link>
          </div>
        }

        {this.state.showLoader &&
          <Loader/>
        }</>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.login.isLoggedIn
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    loginUser: (userName, userId, userEmail) => {
      dispatch({ type: LOGIN, userName, userId, userEmail });
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
