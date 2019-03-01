import React, { useState } from 'react';
import { Link, withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Nav.scss';

function Nav(props) {

  const [searchValue, setSearchValue] = useState();

  const handleSubmit = event => { 
    event.preventDefault();
    let url = '/shop'; 
    if (searchValue !== undefined) {
      url = '?name=' + searchValue;
    }
    props.history.push(url); 
  }; 

  return (
    <Route>
      <nav className='nav'>
        <div className='general-container'>
          <Link to='/' className='nav-link'>
            <h2 className="logo">BestBai</h2></Link>
          <div className='categories'>
            <Link className='nav-link' to='/shop?category=laptops&page=0&limit=8'>Laptops</Link>
            <Link className='nav-link' to='/shop?category=phones&page=0&limit=8'>Phones</Link>
            <Link className='nav-link' to='/shop?category=tablets&page=0&limit=8'>Tablets</Link>
          </div>
        </div>
        <ul className='nav-tool'>
          <form className='searchForm'>
            <input type='text' className='search-input' onChange={e => setSearchValue(e.target.value)} />
            <button type='submit' className='search-button'
              onClick={handleSubmit}>
              <FontAwesomeIcon icon='search' /></button>
          </form>
          <li>
            <Link to='/account' className='nav-link user-navlink'>
              <FontAwesomeIcon icon='user-circle' />
              {props.userName}
            </Link>
          </li>
          <li>
            <Link to='/cart' className='nav-link'>
              <FontAwesomeIcon icon='shopping-cart' />
              {props.cart.length}
            </Link>
          </li>
        </ul>
      </nav>
    </Route>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  isLoggedIn: state.login.isLoggedIn,
  userName: state.login.userName
});



export default withRouter(connect(mapStateToProps, null)(Nav));
