import "./home.scss";
import NavBar from "../../components/navBar/NavBar";
import { useNavigate } from "react-router";
import HOtParties from "../../components/hotParties/HOtParties";
import Hero from "../../components/hero/Hero";
import { Footer } from "../../components/footer/Footer";
import { userSelector } from "../../features/loggedInUser/userSlice";
import { useAppSelector } from "../../app/hook";
import { User } from "../../types-env";

const Home = () => {
  const user: User | null = useAppSelector(userSelector);
  const navigate = useNavigate();
  return (
    <>
    <div className="HPcontainer">
      <NavBar />
      <Hero />
      <h2 className="upcoming">Upcoming Events 📅</h2>
      <HOtParties />
      {user && <button
        onClick={() => navigate("/addNewParty")}
        className="createPartyHP"
      >
        Create Party 🎉
      </button>}
      
    </div>
    <div className="footer">
    <Footer />
    </div>
    </>
  );
};

export default Home;
