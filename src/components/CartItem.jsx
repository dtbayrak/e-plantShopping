import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity } from '../features/CartSlice';
import '../styles/CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += parseInt(item.cost.substring(1)) * item.quantity;
    });
    return total;
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const handleIncrement = (item) => {
    dispatch(addItem(item));
  };

  const handleDecrement = (item) => {
    if(item.quantity < 2) {
      return;
    }
    dispatch(updateQuantity({...item, quantity: item.quantity-1}));
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
    removeFromCart(item.name);
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return parseInt(item.cost.substring(1)) * item.quantity;
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cartItems.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button" style={{ padding: '15px 75px' }} 
        onClick={e => handleCheckoutShopping(e)} disabled={cartItems.length === 0}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


