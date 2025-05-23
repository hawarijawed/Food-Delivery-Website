import React, { useState,useContext } from 'react'
import './Navbar.css'
import '../../assets/assets'
import { assets } from '../../assets/assets'
import {Link, useNavigate} from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
const Navbar = ({setShowLogin}) => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("home");
  const {getTotalCartAmount, token, setToken} = useContext(StoreContext);
  const logOut =() => {
    //remove token   
    localStorage.removeItem("token");
    setToken(""); 
    navigate("/");
  }
  return (
    <div className='navbar'>
      <Link to='/'>
      <img className='logo' src={assets.logo} alt="" />
      </Link>  
      
      <ul className='navbar-menu'>
        <Link to='/' onClick={()=>setMenu("home")} className={menu === 'home'?"active":""}>Home</Link>
        <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu === 'menu'?"active":""}>Menu</a>
        <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu === 'mobile-app'?"active":""}>Mobile App</a>
        <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu === 'contact-us'?"active":""}>Contact us</a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="searc icon" />
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
            
            <div className={getTotalCartAmount()==0?"":"dot"}>
            </div>
        </div>
        {!token?<button onClick={()=>setShowLogin(true)}>Sign In</button>
        :<div className='navbar-profile'> 
          <img src={assets.profile_icon} alt="profile pic" />
          <ul className="navbar-profile-dropdown">
            <li>
              <img src={assets.bag_icon} alt="" />
              <p>Orders</p>
            </li>
            <hr />
            <li onClick={logOut}>
              <img  src={assets.logout_icon} alt="" />
             <p>Log Out</p>
            </li>
          </ul>
        </div>}
      </div>
    </div>
  )
}

export default Navbar
