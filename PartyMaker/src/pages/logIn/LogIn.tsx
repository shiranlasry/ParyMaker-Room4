//login page
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./logIn.scss";
import NavBar from "../../components/navBar/NavBar";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { getUserApi } from "../../features/loggedInUser/userAPI";
import { userSelector } from "../../features/loggedInUser/userSlice";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message
  const user = useAppSelector(userSelector)
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleEmailChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const arg = { email, password };
    try {
      // check what type is resultAction
      const resultAction : any = await dispatch(getUserApi(arg));
     
      if (resultAction.payload && resultAction.payload.username) {
        const loggedInUser = {
          username: resultAction.payload?.username,
        };
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        console.log("Logged in user:", resultAction.payload);
        
      } else {
        console.log("Invalid credentials");
        setErrorMessage("Invalid email or password"); // Set error message state
        
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred. Please try again.");
      // Handle other types of errors, display an error message, or set a state variable
    }
  };
  

  return (
    <div className="login-main">
      <NavBar />
      <div className="loginForm">
        <h1 className="loginTitle">Login</h1>
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </label>
          <button type="submit" className="loginBtn">
            Login
          </button>
       
      </form>
      </div>
    </div>
  );
};

export default LogIn;
