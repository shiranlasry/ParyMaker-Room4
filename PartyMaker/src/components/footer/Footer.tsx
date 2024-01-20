import React from 'react';
import './footer.scss';

export const Footer = () => {
  return (
    <footer className="footer-sec">
      <div className="main">
        <div className="logo row">
          <div className="footer-header">
            <img
              src="https://th.bing.com/th/id/R.edf7ce0e1e948de499d2745a367b321c?rik=yE1qdaGt746Fxg&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fParty-PNG-File-Download-Free.png&ehk=2b9KMwAvsETQ%2fgfmvM8uwb9lj79Cv0mnA%2bq5BsR9BKk%3d&risl=&pid=ImgRaw&r=0"
              className="icon"
              alt=""
            />
          </div>
          <div className="logo-des">
            <p>
              plan your party and invite your friends and family,
              enjoy endless offers of party invitations.
            </p>

            <a href="#" className="btn-know">
              Know More
            </a>
          </div>
        </div>

        <div className="office row">
          <div className="footer-header">
            <h3>Office</h3>
          </div>
          <div className="office-des">
            <p>
              We are located <br /> at Tel aviv office<br />
              Dereh Ha Shalom 13<br />
              available
            </p>

            <a href="#">partyplanner@gmail.com</a>

            <p className="num">+972-050...Call 100 there is a party</p>
          </div>
        </div>

        <div className="link row">
          <div className="footer-header">
            <h3>Links</h3>
          </div>

          <div className="link-des">
            <a href="/" className="footer-links">
              Home
            </a>
            <a href="/about" className="footer-links">
              About
            </a>
            <a href="/contact" className="footer-links">
              Contact
            </a>
          </div>
        </div>

        <div className="newsletter row">
          <div className="newsletter-des">
            <div className="subscribe">
              <i className="sub-icon ri-mail-check-fill"></i>
              <input type="email" placeholder="Enter Email ID" required />
              <i className="sub-icon ri-arrow-right-line"></i>
            </div>
            <div className="icons">
              <a href="https://www.facebook.com/">
                <i className="social-icon ri-facebook-fill"></i>
              </a>
              <a href="https://www.instagram.com/">
                <i className="social-icon ri-instagram-line"></i>
              </a>
              <a href="https://www.linkedin.com/">
                <i className="social-icon ri-linkedin-fill"></i>
              </a>
              <a href="https://github.com/">
                <i className="social-icon ri-github-line"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <hr />
        <p>© Copyright 2024 PartyPlanner.</p>
      </div>
    </footer>
  );
};
