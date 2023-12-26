import React from 'react'
import './home.scss'
import NavBar from '../../components/navBar/NavBar'
import { useNavigate } from 'react-router';

const Home = () => {
    const navigate = useNavigate();
  return (
    <div>
        <NavBar />
      <button
      onClick={() => navigate( '/addNewParty')}
       className='homeBtn'>Create Party 🎉</button>
    </div>
  )
}

export default Home
