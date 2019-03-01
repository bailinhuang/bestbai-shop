import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'; 

class PrivateRoute extends Component {

  render() {  
    const { isLoggedIn, redirectTo, component: Component, ...rest } = this.props;
    let redirectElement = redirectTo;
    return (
      <Route {...rest} render={props => (
        isLoggedIn
          ? <Component {...props} />
          : <Redirect to={redirectElement} />
      )} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.login.isLoggedIn
  };
};

const mapDispatchToProps = () => {
  return {
  };
};

PrivateRoute.defaultProps = {
  redirectTo: '/login'
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);