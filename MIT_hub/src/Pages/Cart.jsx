import React from 'react';
import { useFirebase } from '../Context/FirebaseContext';
import { Link } from 'react-router-dom';
import '../CSS/Cart.css';

const Cart = () => {
  const { user, cart, removeFromCart } = useFirebase();

  if (!user) {
    return (
      <div className="cart-container">
        <div className="auth-options">
          <h2>Please login or register to view your cart</h2>
          <div className="auth-buttons">
            <Link to="/login" className="auth-button">Login</Link>
            <Link to="/register" className="auth-button secondary">Register</Link>
          </div>
        </div>
      </div>
    );
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/marketplace" className="shop-now-button">Shop Now</Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.title} className="item-image" />
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <p className="item-description">{item.description}</p>
                  <p className="item-price">${item.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-button"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-details">
              <p>Subtotal: ${totalPrice.toFixed(2)}</p>
              <p>Shipping: FREE</p>
              <div className="total">
                <h3>Total:</h3>
                <h3>${totalPrice.toFixed(2)}</h3>
              </div>
              <button className="checkout-button">Proceed to Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;