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
    

       <h2 className='upcoming'>Upcoming Events 📅</h2>

       <HOtParties  />
       <button
      onClick={() => navigate( '/addNewParty')}
       className='homeBtn'>Create Party 🎉</button>
    </div>
  )
}

export default Home
