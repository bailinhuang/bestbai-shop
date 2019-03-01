import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import './Home.scss';
import Loader from '../Loader/Loader';

class Home extends Component {

  constructor() {
    super();
    this.state = {
      products: []
    };
  }

  render() {
    return (
      <>
        {!this.state.showLoader ?
          <div className='home-container'>
            <div className='banner'>
              <Link to='/product/5c76a2804ceb48a79cd7666a'>
                <img alt='macbook pro clickable' src='https://firebasestorage.googleapis.com/v0/b/ecommerce-brainstation.appspot.com/o/products%2FLaptops%2FScreenshot%20(3).png?alt=media&token=2951d8f0-b87d-4469-b075-1612565fc2ce' />
              </Link>
            </div>
            <div className='banner'>
              <Link to='/product/5c76c0c44ceb48ad8c5491d8'>
                <img alt='ipad pro clickable' src='https://firebasestorage.googleapis.com/v0/b/ecommerce-brainstation.appspot.com/o/carousel%2Fipad%20PRO%20banner.png?alt=media&token=72b8525b-a47b-46a3-80da-6875f048c1b7' />
              </Link>
            </div>
            <div className='banner'>
              <Link to='/product/5c79412b4ceb48e1946d4b8a'>
                <img alt='iphone xr clickable' src='https://firebasestorage.googleapis.com/v0/b/ecommerce-brainstation.appspot.com/o/carousel%2FiPhone%20XR%20banner.png?alt=media&token=5072c256-3106-48e5-9235-e4624aeaf16b' />
              </Link>
            </div>
          </div>
          : <Loader />
        }
      </>
    );
  }
}
export default withRouter(Home);
