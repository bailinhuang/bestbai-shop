import { postData } from '../utils/API';
import { CART_URL, PLACEORDER_URL } from '../resources/API_URL';
import swal from 'sweetalert';

export const addToCart = props => {
  swal({
    title: 'Product Added',
    text: 'Your product has been added to the cart succesfully.',
    icon: 'success',
    button: 'Back to shopping!',
  });
  const { addToCart, isLoggedIn, userId, product, cart } = props;
  if (cart.length !== 0) {
    product.quantity = 1;
    const index = cart.findIndex(x => x.id === product.id);
    if (index !== -1) {
      cart[index].quantity = cart[index].quantity + 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  addToCart(cart);
  if (isLoggedIn) {
    const url = CART_URL + '?userId=' + userId;
    postData(url, cart);
  }
};


export const addToCartV2 = (props, product) => {
  swal({
    title: 'Product Added',
    text: 'Your product has been added to the cart succesfully.',
    icon: 'success',
    button: 'Back to shopping!',
  });
  const { addToCart, isLoggedIn, userId, cart } = props;
  if (cart.length !== 0) {
    product.quantity = 1;
    const index = cart.findIndex(x => x.id === product.id);
    if (index !== -1) {
      cart[index].quantity = cart[index].quantity + 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  addToCart(cart);
  if (isLoggedIn) {
    const url = CART_URL + '?userId=' + userId;
    postData(url, cart);
  }
};


export const removeFromCart = props => {
  const { deleteFromCart, isLoggedIn, userId, product, cart } = props;
  if (cart.length !== 0) {
    const index = cart.findIndex(x => x.id === product.id);
    if (index !== -1) {
      cart.splice(index, 1);
    }
    deleteFromCart(cart);
    if (isLoggedIn) {
      const url = CART_URL + '?userId=' + userId;
      postData(url, cart);
    }
  };
};

export const editCartProduct = (props, quantity) => {
  const { addToCart, isLoggedIn, userId, product, cart } = props;
  if (cart.length !== 0) {
    const index = cart.findIndex(x => x.id === product.id);
    if (index !== -1) {
      cart[index].quantity = parseInt(quantity);
    }
    addToCart(cart);
    if (isLoggedIn) {
      const url = CART_URL + '?userId=' + userId;
      postData(url, cart);
    }
  };
};


export const calculateSubtotal = cart => {
  let subtotal = 0;
  cart.forEach(product => {
    subtotal = subtotal + product.quantity * product.price;
  });
  return subtotal;
};

export const placeOrder = (products, price, address, card, userId) => {
  const url = PLACEORDER_URL + '?userId=' + userId;
  const order = {
    products: products,
    price: price,
    dateOrdered: new Date(),
    address: address,
    card: card,
    status: 'ordered'
  };
  return postData(url, order)
    .then(res => res)
    .catch(err => console.log(err));
};