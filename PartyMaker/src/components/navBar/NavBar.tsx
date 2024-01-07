
//navbar component

import './navBar.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { userSelector } from '../../features/loggedInUser/userSlice';
import { logoutUser } from '../../features/loggedInUser/userSlice'; 
import { useEffect } from 'react';
import {  getUserFromTokenApi } from "../../features/loggedInUser/userAPI";



const NavBar = () => {
  const navigate = useNavigate();
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();  
  
// useEffect(() => {
//   debugger
//       dispatch(getUserFromTokenApi());
// },[])
  const handelLogout = () => {
    
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <div className='navbar'>
      <div className='navbar__logo'>
        <h1>PartyMaker</h1>
      </div>
      <div className='navbar__user'>
        {/* Conditional check: Show the greeting only if there is a user logged in */}
        {user && <h1 className='greet'>hello {user.username}</h1>}
      </div>
      <div className='navbar__links'>
        {
          user? 
          <div>
            <button onClick={handelLogout}>Logout</button>
            <button onClick={() => navigate('/')}>My Profil</button>
            <button onClick={() => navigate('/')}>Home</button>
            </div>
           :
           <div>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/register')}>Register</button>
          <button onClick={() => navigate('/')}>Home</button>
          </div>
        }
       
       
      
      </div>
    </div>
  );
};

export default NavBar;
