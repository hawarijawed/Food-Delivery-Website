import React, { useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets';
const LoginPopUp = ({setShowLogin}) => {
  const [currState, setCurrState] = useState("Login");
  return (
    
    <div className='login-popup'>
      <form action="" className='login-popup-container'>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>

        <div className="login-popup-input">
          {currState==="Login"?<></>:<input type="text" name="name"  placeholder='Your name' required/>}
          <input type="email" name="email" placeholder='Your Email' required />       
          <input type="password" name="password" placeholder='Enter Password' required />
        </div>
        <button>{currState==="Sign Up"?"Create account":"Login"}</button>

        <div className="login-popoup-condition">
          <input type="checkbox" required/>
          <p>By continuing, I agree to the terms of use & privacy.</p>
        </div>
        {
          currState==="Sign Up"?
          <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login</span></p>
          :<p>Create a new account?   <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
        }
        
        
      </form>
    </div>
  )
}

export default LoginPopUp
