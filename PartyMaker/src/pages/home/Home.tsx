import React from 'react'
import './home.scss'
import NavBar from '../../components/navBar/NavBar'

const Home = () => {
  return (
    <div>
        <NavBar />
      <button className='homeTitle'>Create Party 🎉</button>
    </div>
  )
}

export default Home
