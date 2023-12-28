import React from 'react'
import './home.scss'
import NavBar from '../../components/navBar/NavBar'
import { useNavigate } from 'react-router';
import HOtParties from '../../components/hotParties/HOtParties';

const Home = () => {
    const navigate = useNavigate();
  return (
    <div>
        <NavBar />
      <button
      onClick={() => navigate( '/addNewParty')}
       className='homeBtn'>Create Party 🎉</button>

       <HOtParties  />
    </div>
  )
}

export default Home
