//login page
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {usersData}  from "../../utils/data";
import "./logIn.scss";
import NavBar from "../../components/navBar/NavBar";
import { User } from "../../types-env";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { userSelector } from "../../features/loggedInUser/userSlice";
import { getUserApi } from "../../features/loggedInUser/userAPI";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

 const dispatch = useAppDispatch();
const user = useAppSelector(userSelector)


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

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const arg = { email, password };
    dispatch(getUserApi(arg))
    .then((resultAction) => {
      if (getUserApi.fulfilled.match(resultAction)) {
        const loggedInUser = {
          username: resultAction.payload?.username,
        };
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        console.log("Logged in user:", resultAction.payload);
        navigate("/");
      } else {
        console.log("Invalid credentials");
      }
    });
   
  
  };

  return (
    <div className="container-main">
       <NavBar />
      <h1 className="loginTitle">Login</h1>
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
        <button type="submit" className="submitBtn">Login</button>

        <div className='test'>
        <p>For testing</p>
        <p>
          <small>Email: <code>john.doe@gmail.com</code></small>
        </p>
        <p>
          <small>Password: <code>john123</code></small>
        </p>
      </div>
      </form>
    </div>
  );
};

export default LogIn;
