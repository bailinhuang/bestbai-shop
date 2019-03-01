import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postData } from '../../utils/API';
import './Register.scss';
import { USER_URL } from '../../resources/API_URL';
import { fireBaseCreateUser } from '../../utils/Firebase';
import { LOGIN } from '../../redux/actions/sessionActionTypes';
import { withRouter } from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      phone: '',
      prefix: ''
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      phone: this.state.phone,
      prefix: this.state.prefix
    };

    if (this.state.name !== '' && this.state.name !== undefined) {
      fireBaseCreateUser(this.state.email, this.state.password)
        .then(res => { 
          postData(USER_URL, user)
            .then(res => {
              this.props.loginUser();
              this.props.history.push('/');
            });
        })
        .catch(function (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/weak-password') {
            alert('The password is too weak.' + errorMessage);
          } else if (errorCode === 'auth/email-already-in-use') {
            alert('the email is already in use' + errorMessage);
          }
        });
    } else {
      alert('name must not be empty');
    }
  }

  render() {
    return (
      <div className='register-container'>
        <h2>Register</h2>
        <form className='registerForm' onSubmit={this.handleSubmit}>
          <label>Email</label>
          <input name='emailInput' type='text' value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })}></input>
          <label>Name</label>
          <input name='nameInput' type='text' value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })}></input>
          <label>Password</label>
          <input name='passwordInput' type='password' value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })}></input>
          <label>Phone</label>
          <label>Ext</label>
          <input name='phonePrefixInput' type='text' value={this.state.prefix} onChange={(e) => this.setState({ prefix: e.target.value })}></input>
          <label>Number</label>
          <input name='phoneInput' type='text' value={this.state.phone} onChange={(e) => this.setState({ phone: e.target.value })}></input>
          <input type='submit' value='Register'></input>
        </form> 
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    loginUser: () => {
      dispatch({ type: LOGIN });
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
