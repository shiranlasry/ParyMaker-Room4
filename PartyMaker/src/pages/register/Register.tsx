/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import GeneralBtn from "../../components/generalBtn/GeneralBtn";
import NavBar from "../../components/navBar/NavBar";
import { registerUserApi } from "../../features/loggedInUser/userAPI";
import { userSelector } from "../../features/loggedInUser/userSlice";
import "../../pages/home/home.scss";
import { User } from "../../types-env";
import "./register.scss";

const Register = () => {
  const initialUserState: User = {
    user_id: null,
    email: "",
    password: "",
    username: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    address: "",
    role: "user",
  };
  const [newUser, setNewUser] = useState<User>(initialUserState);
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(userSelector);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };
  

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  const hendalRegister = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();
      const resultAction: any = await dispatch(registerUserApi(newUser));

      if (!resultAction.payload)  {
        console.log("Invalid credentials");
        setErrorMessage("Invalid credentials"); // Set error message state
      } else {
        console.log("Registration successful. User data:", resultAction.payload);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  return (
    <div className="registerMain">
      <NavBar />
      <form className="registerForm" onSubmit={hendalRegister}>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <h1 className="registerTitle">Register</h1>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
          required
          title="Enter a valid email address"
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
          required
        />
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={newUser.username}
          onChange={handleInputChange}
          required
        />
        <label>First Name:</label>
        <input
          type="text"
          name="first_name"
          value={newUser.first_name}
          onChange={handleInputChange}
          required
        />
        <label>Last Name:</label>
        <input
          type="text"
          name="last_name"
          value={newUser.last_name}
          onChange={handleInputChange}
          required
        />
        <label>Phone Number:</label>
        <input
          type="text"
          name="phone_number"
          value={newUser.phone_number}
          onChange={handleInputChange}
          required
        />

        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={newUser.address}
          onChange={handleInputChange}
          required
        />

<GeneralBtn buttonText="Register" type="submit"/>
          
        
      </form>

      {/* <Footer /> */}
    </div>
  );
};

export default Register;
// function dispatch(registerUserApi: any): any {
//   throw new Error("Function not implemented.");
// }
