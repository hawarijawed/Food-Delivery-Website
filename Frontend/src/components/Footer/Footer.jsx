import React from 'react'
import './Footer.css';
import { assets } from '../../assets/assets';
const Footer = () => {
  return ( 
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae provident temporibus minus autem animi. Eos architecto, expedita ipsa, illo accusantium quos minima temporibus similique at voluptatem deleniti impedit porro asperiores.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>
                Company
            </h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>Get in touch</h2>
            <ul>
                <li>+91 98000000</li>
                <li>contact@foody.com</li>
            </ul>
        </div>
        
      </div>
      <hr />
      <p className="footer-copy-right">
        Copyright 2025 c Tomato.com - All rights Reserved.
      </p>
    </div>
  )
}

export default Footer
