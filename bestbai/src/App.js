import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import Register from './components/Register/Register';
import './App.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart, faUserCircle, faSearch, faPlus, faGreaterThan, faLessThan, faBox, faMapMarkedAlt, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import Login from './components/Login/Login';
import AccountDashboard from './components/AccountDashboard/AccountDashboard';
import NotFound from './components/NotFound/NotFound';
import ProductList from './components/ProductList/ProductList';
import Product from './components/Product/Product';
import Cart from './components/Cart/Cart';
import PrivateRoute from './components/PrivateRoute/PrivateRoute'; 
import CheckoutAddressBoard from './components/CheckoutAddressBoard/CheckoutAddressBoard';
import CheckoutPayment from './components/CheckoutPayment/CheckoutPayment';
import CheckoutPlaceOrder from './components/CheckoutPlaceOrder/CheckoutPlaceOrder'; 
import AccountOrders from './components/AccountOrders/AccountOrders';
import AccountAddressBoard from './components/AccountAddressBoard/AccountAddressBoard';  
import AccountPayment from './components/AccountPayment/AccountPayment';

library.add(faSearch, faShoppingCart, faUserCircle, faPlus, faLessThan, faGreaterThan, faBox, faMapMarkedAlt, faCreditCard);

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <PrivateRoute exact path="/account" component={AccountDashboard} />
              <PrivateRoute exact path="/account/payment" component={AccountPayment} />
              <PrivateRoute exact path="/account/orders" component={AccountOrders} />
              <PrivateRoute exact path="/account/addresses" component={AccountAddressBoard} />
              <Route exact path="/register" component={Register} /> 
              <Route exact path="/shop" component={ProductList} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/product/:id" component={Product} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute path='/buy/address' component={CheckoutAddressBoard}/>
              <PrivateRoute path='/checkout/payment' component={CheckoutPayment}/>
              <PrivateRoute path='/checkout/placeorder' component={CheckoutPlaceOrder}/>
              <Route component={NotFound} />
            </Switch> 
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
