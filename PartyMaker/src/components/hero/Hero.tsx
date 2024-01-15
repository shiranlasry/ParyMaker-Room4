import React from 'react'
import './hero.css';

const Hero = () => {
  return (
    <>
        <div className="container-fluid hero-container">
            <div className="row">
                <div className="wrappers">
                    <h1 className="font-weight-bold">Welcome to PartyPlanner. Plan your party at a click of a button.</h1>
                    <p className='appDescription'>Whatever your interest, from hiking and reading to networking and skill sharing, there are thousands of people who share it on PartyPlanner. Events are happening every day—sign up to join the fun.</p>
                </div>
                    <div className="wrappers">
                        <img src="https://wallpapercave.com/wp/wp7713640.jpg" className='image-container rounded-top-right' alt="PartyPlanner" />
                    </div>
            </div>
        </div>
    </>
  )
}

export default Hero