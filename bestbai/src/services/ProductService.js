import { getData } from '../utils/API';
import { PRODUCT_URL } from '../resources/API_URL';

export const getProduct = (id) => {
  return getData(PRODUCT_URL+ '/' + id);
};

export const getProducts = (name, category, page, limit) => {
  const url = PRODUCT_URL + '?name=' + name + '&category=' + category + '&page=' + page + '&limit=' + limit;
  return fetch(url, {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json', 
    }
  }).then(res => res.json())
    .catch(error => console.error('Error:', error));
};

export const getProductsByCategory = (category, page, limit) => {
  const url = PRODUCT_URL + '?category=' + category + '&page=' + page + '&limit=' + limit;
  return fetch(url, {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json', 
    }
  }).then(res => res.json())
    .catch(error => console.error('Error:', error));
};
