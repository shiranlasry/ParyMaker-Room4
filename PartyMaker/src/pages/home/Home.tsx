import "./home.scss";
import NavBar from "../../components/navBar/NavBar";
import { useNavigate } from "react-router";
import HOtParties from "../../components/hotParties/HOtParties";
import Hero from "../../components/hero/Hero";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <NavBar />
      <Hero />

      <h2 className="upcoming">Upcoming Events 📅</h2>

      <HOtParties />
      <button
        onClick={() => navigate("/addNewParty")}
        className="createPartyHP"
      >
        Create Party 🎉
      </button>
    </div>
  );
};

export default Home;
