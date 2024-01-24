//login page
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import NavBar from "../../components/navBar/NavBar";
import { logInUserApi } from "../../features/loggedInUser/userAPI";
import { userSelector } from "../../features/loggedInUser/userSlice";
import "./logIn.scss";

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const resultAction : any = await dispatch(logInUserApi(arg));
      if (!resultAction.payload)  {
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
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              required
              title="Enter a valid email address"

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
<div className="footer">
      {/* <Footer /> */}
      </div>
    </div>
  );
};

export default LogIn;
