//navbar component

import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { userSelector } from "../../features/loggedInUser/userSlice";
import "./navBar.scss";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { deleteTokenApi, getUserFromTokenApi } from "../../features/loggedInUser/userAPI";
import { getAllParties } from "../../features/parties/partiesAPI";
import { resetIncomingParty, resetIsUserjoinedParty } from "../../features/parties/partiesSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const user = useAppSelector(userSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if(!user) dispatch(getUserFromTokenApi());
     dispatch(getAllParties());
  }, []);
 const hendalAdminPage = () => {
    navigate(`/admin/${user?.user_id}`);
    
 }
  const handelLogout = () => {
    dispatch(deleteTokenApi());
    dispatch(resetIsUserjoinedParty())
    dispatch(resetIncomingParty())
    navigate("/");
  };
  const hendalGoHome = () => {
    dispatch(resetIsUserjoinedParty());
    dispatch(resetIncomingParty());
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <h1>PartyMaker</h1>
      </div>
      <div className="navbar__user">
        {/* No empty span here, only show the greeting when the user is logged in */}
        {user && <span className="greet"></span>}
      </div>
      <div className="navbar__links">
        {user ? (
          <>
            <button className="greetBtn" onClick={() => navigate("/userPage")}>
              <FontAwesomeIcon icon={faUser} /> <span className="greet"> Hi {user.username} </span>
            </button>
            <button onClick={() => navigate("/addNewParty")} className="addNewParty">
             +New</button>
            <button onClick={hendalGoHome}>Home</button>
            {user.role === "admin" && <button onClick={hendalAdminPage}>Admin</button>} 
            <button onClick={handelLogout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
            <button onClick={() => navigate("/")}>Home</button>

          </>
        )}
      </div>
    </div>
  );
};



export default NavBar;
