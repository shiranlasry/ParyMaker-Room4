import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/NavBar";
import "./userPage.scss";

const UserPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <NavBar />
      <h1>My Events</h1>
      <button
        onClick={() => navigate("/addNewParty")}
        className="createPartyUP"
      >
        Create Party 🎉
      </button>
    </div>
  );
};

export default UserPage;
