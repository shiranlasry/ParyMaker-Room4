import React, { useEffect, useState } from 'react';
import './navBar.scss';
import { useNavigate } from 'react-router-dom';

interface User {
  username: string;
}

const NavBar = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser !== null) {
      const user = JSON.parse(storedUser) as User;
      setLoggedInUser(user);
    }
  }, []);

  return (
    <div className='navbar'>
      <div className='navbar__logo'>
        <h1>PartyMaker</h1>
      </div>
      <div className='navbar__links'>
        {loggedInUser ? (
          <div>
            <span>Welcome, {loggedInUser.username}</span>
            <button onClick={() => navigate('/')}>Home</button>
          </div>
        ) : (
          <>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/register')}>Register</button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
