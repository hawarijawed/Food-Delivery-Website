import React from 'react'
import './AppDownload.css';
import '../../assets/assets'
import { assets } from '../../assets/assets';
const AppDownload = () => {
  return (
    <div className='app-download'>
        <p>For Better Experience Download <br />Tomato App</p>
        <div className="app-download-platforms" id='app-download'>
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>
    </div>
  )
}

export default AppDownload
