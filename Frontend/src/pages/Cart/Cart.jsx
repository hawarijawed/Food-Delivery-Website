import React, { useContext } from 'react'
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';
import {useNavigate} from 'react-router-dom'
const Cart = () => {
  const { cartItems, food_list, removeFromCart,getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-titles">
          <p>Items</p>
          <p>Titles</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {
          food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              {
                return (
                  <div key={index}>
                    <div className='cart-items-titles cart-items-item'>
                      <img src={url+"/images/"+item.image} alt="item image" />
                      <p>{item.name}</p>
                      <p>${item.price}</p>
                      <p>{cartItems[item._id]}</p>
                      <p>${item.price * cartItems[item._id]}</p>
                      <p className='cross' onClick={() => removeFromCart(item._id)}>X</p>
                    </div>
                    <hr />
                  </div>
                )
              }
            }
          })
        }
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:23}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+23}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>Proceed To Checkout</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have promo code, Enter here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promo code' />
              <button>submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
