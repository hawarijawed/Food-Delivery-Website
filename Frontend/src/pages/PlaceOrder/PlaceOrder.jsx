import React, { useContext } from 'react'
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';
const PlaceOrder = () => {
  const {getTotalCartAmount} = useContext(StoreContext);
  return (
    <div>
      <form action="" className='place-order'>
        <div className="place-order-left">
          <p className='title'>Delivery Information</p>
          <div className="multi-fields">
            <input type="text" placeholder='First Name'/>
            <input type="text" placeholder='Last Name'/>
          </div>
          <input type="email" placeholder='Email'/>
          <input type="text" placeholder='Street'/>
        
          <div className="multi-fields">
            <input type="text" placeholder='City'/>
            <input type="text" placeholder='State'/>
          </div>

          <div className="multi-fields">
            <input type="text" placeholder='Zip code'/>
            <input type="text" placeholder='Country'/>
          </div>

          <input type="text" placeholder='Phone'/>
        </div>

        <div className="place-order-right">
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
        </div>
      </form>
    </div>
  )
}

export default PlaceOrder
