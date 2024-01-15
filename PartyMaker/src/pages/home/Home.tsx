import "./home.scss";
import NavBar from "../../components/navBar/NavBar";
import { useNavigate } from "react-router";
import HOtParties from "../../components/hotParties/HOtParties";
import Hero from "../../components/hero/Hero";
import { Footer } from "../../components/footer/Footer";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
    <div className="HPcontainer">
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
    <div className="footer">
    <Footer />
    </div>
    </>
  );
};

export default Home;
