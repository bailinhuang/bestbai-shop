import React, { Component } from 'react';
import Card from '../Card/Card';
import { getProducts } from '../../services/ProductService';
import { withRouter, Route } from 'react-router-dom';
import queryString from 'query-string';
import ReactPaginate from 'react-paginate';
import './ProductList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from '../Loader/Loader';
import io from 'socket.io-client';

export const socket = io.connect('http://localhost:3001');

class ProductList extends Component {

  constructor() {
    super();
    this.state = {
      showLoader: true,
      products: [],
      category: '',
      page: 0,
      limit: 0,
      totalPages: '',
      name: ''
    };
  }

  updateProducts = (parameters) => {
    const { name, category, page, limit } = parameters;
    getProducts(name, category, page, limit).then(res => {
      this.setState({
        products: res.content.content,
        category: category,
        page: page,
        limit: limit,
        totalPages: res.content.totalPages,
        name: name,
        showLoader: false
      });
    }).catch(err =>
      this.setState({
        showLoader: false
      }));
  }

  componentDidMount() {
    const parameters = queryString.parse(this.props.location.search);
    //Set a listener to the socket, so every time the server emits a message
    // the client will add a new message and update the UI
    socket.on('productsUpdate', () => {
      this.updateProducts(parameters);
    });
    this.updateProducts(parameters);
  }

  componentDidUpdate() {
    const parameters = queryString.parse(this.props.location.search);
    let { name, category, page, limit } = parameters;
    if (name !== this.state.name || category !== this.state.category || page !== this.state.page || limit !== this.state.limit) {
      this.updateProducts(parameters);
    }
  }

  handlePageChange(data, props) {
    let url = '/shop?';
    const parameters = queryString.parse(props.location.search);
    let { name, category } = parameters;
    if (name !== 'undefined' && name !== undefined) {
      url += + 'name=' + name + '&';
    }
    if (category !== 'undefined' && category !== undefined) {
      url += 'category=' + category;
    }
    url += '&page=' + data.selected + '&limit=8';
    this.props.history.push(url);
  }

  handleCategoryChange = (event) => {
    console.log(event.target.value); 
    let url = '/shop?';
    const parameters = queryString.parse(this.props.location.search); 
    let { name, category } = parameters;
    if (name !== 'undefined' && name !== undefined) {
      url += + 'name=' + name + '&';
    } 
    url += 'category=' + event.target.value;
    url += '&page=0&limit=8';
    this.props.history.push(url);
  }

  render() {
    let productCards = <h2>Couldn't find what you were looking for.</h2>;
    if (this.state.products.length !== 0) {
      productCards = this.state.products.map(product => <Card product={product} key={product.id} />);
    }
    return (
      <>
        {!this.state.showLoader ?
          <Route>
            <div className='product-list-container'>
              <h1>Results</h1>
              <h2 className='product-list-subtitle'>{this.state.category}</h2>
              <select onChange={this.handleCategoryChange} className='category-select'>
                <option>Laptops</option>
                <option>Phones</option>
                <option>Tablets</option>
              </select>
              <div className='product-card-container'>
                {productCards}
              </div>
              <div className='paginate'>
                <ReactPaginate
                  pageCount={this.state.totalPages}
                  pageRangeDisplayed={8}
                  onPageChange={(data) => this.handlePageChange(data, this.props)}
                  previousLabel={<FontAwesomeIcon icon='less-than' />}
                  nextLabel={<FontAwesomeIcon icon='greater-than' />} />
              </div>
            </div>
          </Route>
          :
          <Loader />
        }
      </>
    );
  }
}

export default withRouter(ProductList);