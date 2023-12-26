import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import usersData from "../../utils/data";
import "./logIn.scss";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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

    const user = usersData.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      const loggedInUser = {
        username: user.username,
      };
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      console.log("Logged in user:", user);
      navigate("/");
    } else {
      console.log("Invalid credentials");
    }
  };

  return (
    <div className="container-main">
      <h1>Login</h1>
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
        <button type="submit">Login</button>

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
