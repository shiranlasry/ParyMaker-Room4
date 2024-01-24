import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../app/hook";
import { Footer } from "../../components/footer/Footer";
import Hero from "../../components/hero/Hero";
import HOtParties from "../../components/hotParties/HOtParties";
import NavBar from "../../components/navBar/NavBar";
import { userSelector } from "../../features/loggedInUser/userSlice";
import { User } from "../../types-env";
import AddNewPartyBtn from './../../components/createNewPartyBtn/AddNewPartyBtn';
import "./home.scss";

const Home = () => {
  const user: User | null = useAppSelector(userSelector);
  const navigate = useNavigate();

  return (
    <>
      <div className="HPcontainer">
        <NavBar />
        <Hero />
        
        {user && (
          <AddNewPartyBtn buttonText="Create New Party 🎉" onClick={() => navigate("/addNewParty")} />
        )}
        
        <Toaster position="top-right"/>
        <HOtParties />
      </div>
      
      <div className="footer">
        <Footer />
      </div>
    </>
  );
};

export default Home;
