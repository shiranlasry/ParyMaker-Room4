import "./register.scss";
import NavBar from "../../components/navBar/NavBar";
import { User } from "../../types-env";
import { useEffect, useState } from "react";
import { registerUserApi } from "../../features/loggedInUser/userAPI";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { userSelector } from "../../features/loggedInUser/userSlice";
import { useNavigate } from "react-router";

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
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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

      if (resultAction.payload && resultAction.payload.username) {
        console.log("Registered user:", resultAction.payload);
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(resultAction.payload.username)
        );
        console.log("Logged in user:", resultAction.payload);
      } else {
        console.log("Invalid credentials");
        setErrorMessage("Invalid credentials"); // Set error message state
      }
    } catch (error) {}
  };
  return (
    <div className="registerMain">
      <NavBar />
      <form className="registerForm" onSubmit={hendalRegister}>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <h1 className="registerTitle">Register</h1>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
        />
        <label>Password:</label>
        <input
          type="text"
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
        />
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={newUser.username}
          onChange={handleInputChange}
        />
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={newUser.firstName}
          onChange={handleInputChange}
        />
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={newUser.lastName}
          onChange={handleInputChange}
        />
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={newUser.phoneNumber}
          onChange={handleInputChange}
        />

        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={newUser.address}
          onChange={handleInputChange}
        />

        <button type="submit" className="regBtn">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
function dispatch(registerUserApi: any): any {
  throw new Error("Function not implemented.");
}
