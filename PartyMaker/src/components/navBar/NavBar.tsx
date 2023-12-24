import React from 'react'
import './navBar.scss'
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();
  return (
    <div className='navbar'>
        <div className='navbar__logo'>
            <h1>PartyMaker</h1>
        </div>
        <div className='navbar__links'>
        <button onClick={() => navigate( '/login')}>Login</button>
        <button onClick={() => navigate( '/register')}>Register</button>
        <button onClick={() => navigate( '/')}>Home</button>
        </div>
      
    </div>
  )
}

export default NavBar
