import React from 'react'
import './navBar.scss'
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hook';
import { userSelector } from '../../features/loggedInUser/userSlice';

const NavBar = () => {
    const navigate = useNavigate();
    const user = useAppSelector(userSelector)
  return (
    <div className='navbar'>
        <div className='navbar__logo'>
            <h1>PartyMaker</h1>
        </div>
        <div className='navbar__user'>
            <h1 className='greet'>hello {user? user.username: null}</h1>
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
