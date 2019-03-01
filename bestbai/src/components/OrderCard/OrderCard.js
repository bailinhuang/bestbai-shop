import React from 'react';
import './OrderCard.scss';

function OrderCard(props) {
  const { order } = props;
  const paymentMethod = order.card.number.substring(order.card.number.length - 4, order.card.number.length);
  const productList = order.products.map(product => OrderProductCard(product));
  return (
    <div className='order-card'>
      <h4>Order</h4>
      <p className='order-id'>#{order.id}</p>
      <div className='order-content'>
        <div className='order-product-list'>
          {productList}
        </div>
        <div className='order-details'>
          <p>Date ordered: {order.dateOrdered.substring(0, 10)}</p>
          <p>Status: {order.status}</p>
          <p>Payment method: Card ending with {paymentMethod} </p>
          <p>Total: ${order.price}</p>
        </div>
      </div>
    </div>
  );
}
export default OrderCard;

function OrderProductCard(product) {
  return (
    <div className='order-product'>
      <div className='order-product-img-wrapper'>
        <img alt={'order image of ' + product.name} src={product.image} />
      </div>
      <div>
        <p>Name: {product.name}</p>
        <p>Price: {product.price}</p>
        <p>Quantity: {product.quantity}</p>
      </div>
    </div>
  );
}