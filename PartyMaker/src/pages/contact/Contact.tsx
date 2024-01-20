import "./Contact.css";
import { Link } from "react-router-dom";

const Contact: React.FC = () => {
  return (
    <div className="contact">
      <Link to="/" className="back-button">
        Back to Home
      </Link>
      <h1>Contact Us</h1>
      <ul>
        <li>
          <a
            href="https://github.com/shiranlasry/ParyMaker-Room4"
            target="_blank"
            rel="noopener noreferrer"
          >
            PartyMaker GitHub
          </a>
        </li>
        <li>
          <a
            href="https://github.com/shiranlasry"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shiran
          </a>
        </li>
        <li>
          <a
            href="https://github.com/LeeDek"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lee
          </a>
        </li>
        <li>
          <a
            href="https://github.com/hadaritzhaki"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hadar
          </a>
        </li>
        <li>
          <a
            href="https://github.com/DorielShacham"
            target="_blank"
            rel="noopener noreferrer"
          >
            Doriel
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Contact;
