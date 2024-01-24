import React, { useState } from "react";
import { User } from "../../types-env";
import "./ResetPassword.scss";

interface ResetPasswordModalProps {
    user: User;
    onSave: (user_id:number,password: string, confirmPassword: string,role:string) => void;
    onClose: () => void;
}

const ResetPassword: React.FC<ResetPasswordModalProps> = ({ user, onSave,onClose }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordConditions, setPasswordConditions] = useState([
    { label: "At least 8 characters", met: false },
    { label: "At least one uppercase letter", met: false },
    { label: "Matching passwords", met: false },
    // Add more conditions as needed
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }

    // Check password conditions
    const updatedConditions = passwordConditions.map(condition => ({
      ...condition,
      met: checkCondition(name, value, condition.label),
    }));

    // Update the state with the new conditions
    setPasswordConditions(updatedConditions);
  };

  const checkCondition = (name: string, value: string, condition: string): boolean => {
    switch (condition) {
      case "At least 8 characters":
        return value.length >= 8;
      case "At least one uppercase letter":
        return /[A-Z]/.test(value);
      case "Matching passwords":
        return name === "confirmPassword" ? value === password : true; // Check only when confirming password
      // Add more conditions as needed
      default:
        return false;
    }
  };
  const passwordIsValid = passwordConditions.every(condition => condition.met);
  const passwordsMatch = password === confirmPassword;

  const handleSave = () => {
  
    if (passwordsMatch) {
        
      onSave(user.user_id!,password, confirmPassword,user.role);
      onClose();
    } else {
      // Passwords don't match, handle accordingly (e.g., show an error message)
      console.error("Passwords do not match");
    }
  };

  return (
    <div className="mainResetPassword">
      <form>
        <h1>Reset Password</h1>
        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleInputChange}
        />
        <div className="passwordConditions">
          <p>Password Conditions:</p>
          <ul>
            {passwordConditions.map((condition, index) => (
              <li key={index} className={condition.met ? "met" : ""}>
                {condition.met ? "✔" : "✘"} {condition.label}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <button className="saveBtn" type="button" onClick={handleSave} disabled={!passwordIsValid || !passwordsMatch}>
            Save
          </button>
          <button className="cancelBtn" type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
