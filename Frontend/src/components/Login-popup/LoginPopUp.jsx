import React, {  useContext, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
const LoginPopUp = ({setShowLogin}) => {
  
  const {url, setToken} = useContext(StoreContext);
  
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name:"",
    email:"",
    password:""
  });

  const onChangeHandler = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    console.log(value);
    setData(data=>({...data, [name]:value}));    
  }
 
  const onLogIn = async (e) =>{
    e.preventDefault();
    let newUrl = url;
    if(currState === "Login"){
      newUrl += "/api/user/login";
    }
    else{
      newUrl += "/api/user/register";
    }

    const response = await axios.post(newUrl, data);
    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    }
    else{
      alert(response.data.message);
    }
  
  } 
  return (  
    <div className='login-popup'>
      <form onSubmit={onLogIn} action="" className='login-popup-container'>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>

        <div className="login-popup-input">
          {currState==="Login"?<></>:<input type="text" name="name" onChange={onChangeHandler} value={data.name} placeholder='Your name' required/>}
          <input type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder='Your Email' required />       
          <input type="password" name="password" onChange={onChangeHandler} value={data.password} placeholder='Enter Password' required />
        </div>
        <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>

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
