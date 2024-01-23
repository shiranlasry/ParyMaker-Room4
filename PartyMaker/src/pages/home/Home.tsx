import "./home.scss";
import NavBar from "../../components/navBar/NavBar";
import { useNavigate } from "react-router";
import HOtParties from "../../components/hotParties/HOtParties";
import Hero from "../../components/hero/Hero";
import { Footer } from "../../components/footer/Footer";
import { userSelector } from "../../features/loggedInUser/userSlice";
import { useAppSelector } from "../../app/hook";
import { User } from "../../types-env";
import { Toaster } from "react-hot-toast";

const Home = () => {
  const user: User | null = useAppSelector(userSelector);
  const navigate = useNavigate();
  const handelGoAllParties = () => {
    navigate("/allParties");
  };
  return (
    <>
    <div className="HPcontainer">
      <NavBar />
      
      <Hero />
      {user && <button
        onClick={() => navigate("/addNewParty")}
        className="createPartyHP"
      >
        Create New Party 🎉
      </button>}
      <Toaster position="top-right"/>
      <HOtParties />
    
      <button  className="createPartyHP" onClick={handelGoAllParties} >For All Parties 🎶🎉</button>
    </div>
    <div className="footer">
    <Footer />
    </div>
    </>
  );
};

export default Home;
