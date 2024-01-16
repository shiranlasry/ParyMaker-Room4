import "./register.scss";
import NavBar from "../../components/navBar/NavBar";
import { User } from "../../types-env";
import { useEffect, useState } from "react";
import { getUserFromTokenApi, registerUserApi } from "../../features/loggedInUser/userAPI";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { userSelector } from "../../features/loggedInUser/userSlice";
import { useNavigate } from "react-router";
import { Footer } from "../../components/footer/Footer";

const Register = () => {
  const initialUserState: User = {
    user_id: null,
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    role: "user",
  };
  const [newUser, setNewUser] = useState<User>(initialUserState);
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(userSelector);
  const handleInputChange = ( e: React.ChangeEvent< HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement > )=>{
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
          required
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
          name="firstName"
          value={newUser.firstName}
          onChange={handleInputChange}
          required
        />
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={newUser.lastName}
          onChange={handleInputChange}
          required
        />
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={newUser.phoneNumber}
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

        <button type="submit" className="regBtn">
          Register
        </button>
      </form>

      {/* <Footer /> */}
    </div>
  );
};

export default Register;
function dispatch(registerUserApi: any): any {
  throw new Error("Function not implemented.");
}
