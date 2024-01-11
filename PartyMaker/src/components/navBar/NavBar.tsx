import "./navBar.scss";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { userSelector } from "../../features/loggedInUser/userSlice";
import { logoutUser } from "../../features/loggedInUser/userSlice";
import { useEffect } from "react";
import { getUserFromTokenApi } from "../../features/loggedInUser/userAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { getAllParties } from "../../features/parties/partiesAPI";
import { partiesSelector } from "../../features/parties/partiesSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const user = useAppSelector(userSelector);
  const parties = useAppSelector(partiesSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) dispatch(getUserFromTokenApi());
    if (!parties) dispatch(getAllParties());
  }, []);

  const handelLogout = () => {
    dispatch(logoutUser());
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
            <button onClick={() => navigate("/")}>Home</button>
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
