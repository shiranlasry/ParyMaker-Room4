import {Link} from 'react-router-dom'
import "./about.css";

const About = () => {
  return (
    <div className="about">
      <Link to="/" className="back-button">
        Back to Home
      </Link>

      <section className="about__section">
        <h2>Welcome to PartyMaker</h2>
        <p>
          PartyMaker is a dedicated platform for party enthusiasts to share and
          join exciting events. Whether you're hosting a gathering or looking
          for the next great party, PartyMaker provides a space to connect with
          like-minded individuals and make your events memorable.
        </p>
      </section>

      <section className="about__section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to create a vibrant community where users can share
          their party ideas, events, and experiences. PartyMaker aims to bring
          people together, providing a platform to showcase unique parties and
          fostering a dynamic social space for party enthusiasts.
        </p>
      </section>

      <section className="about__section">
        <h2>Key Features</h2>
        <ul>
          <li>
            Party Sharing: Share details about your upcoming party and let
            others join in the celebration.
          </li>
          <li>
            Event Diversity: Explore a variety of parties hosted by different
            users, from themed gatherings to spontaneous events.
          </li>
          <li>
            Community Connection: Connect with fellow party lovers, exchange
            ideas, and make new friends who share your passion for celebrations.
          </li>
        </ul>
      </section>

      <section className="about__stats">
        <div className="about__stats-item">
          <h3>5+</h3>
          <p>Party Hosts</p>
        </div>
        <div className="about__stats-item">
          <h3>4+</h3>
          <p>Organizations</p>
        </div>
        <div className="about__stats-item">
          <h3>10+</h3>
          <p>Featured Parties</p>
        </div>
        <div className="about__stats-item">
          <h3>99%</h3>
          <p>Connection Rate</p>
        </div>
      </section>
    </div>
  );
};

export default About;
