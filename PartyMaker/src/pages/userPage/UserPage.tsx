import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/NavBar";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { User } from "../../types-env";
import "./userPage.scss";
import "../../components/editProfile/editProfile.scss";
import { Footer } from "../../components/footer/Footer";
import EditProfileModal from "../../components/editProfile/EditProfile";
import { userSelector } from "../../features/loggedInUser/userSlice";
import { editUserApi } from "../../features/loggedInUser/userAPI";
import ResetPassword from "../../components/rest-password/ResetPassword";
import { updatePasswordApi } from "../../features/loggedInUser/userAPI";

const UserPage: React.FC = () => {
  const user: User | null = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const [showEditProfile, setShowEditProfile] = useState(false);

  const handleSaveProfile = async (editedUser: User) => {
    try {
      const respons = await dispatch(editUserApi(editedUser));

      if (respons) {
        alert("Profile updated successfully");
        //navigate("/");
      }

      setShowEditProfile(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProfile = () => {
    setShowEditProfile(true);
  };

  const handleCloseEditProfile = () => {
    setShowEditProfile(false);
  };
  const [showResetPassword, setShowResetPassword] = useState(false);

  const handleResetPassword = () => {
    setShowResetPassword(true);
  };

  const handleCloseResetPassword = () => {
    setShowResetPassword(false);
  };
  const handleSaveResetPassword = async (
    user_id: number,
    password: string,
    newPassword: string,
    role: string
  ) => {
    try {
      debugger;
      const args = { user_id, password, newPassword, role };
      const response = await dispatch(updatePasswordApi(args));

      if (response) {
        alert("Password updated successfully");
        // navigate("/");
      }

      setShowResetPassword(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="UPmain">
    <NavBar />
    <div className="userPage">
      {showEditProfile ? (
        // If showEditProfile is true, render the edit profile form
        <>
          <EditProfileModal user={user!} onSave={handleSaveProfile} onClose={handleCloseEditProfile} />
        </>
      ) : (
        <>
          <div className="UPdetails">
            {user ? (
              <>
                <h1>Personal Information</h1>
                <h2>{user.username}</h2>
                <h2>{user.email}</h2>
                <h2>{user.first_name}</h2>
                <h2>{user.last_name}</h2>
                <h2>{user.address}</h2>
                <h2>{user.phone_number}</h2>
              </>
            ) : (
              <>
                <p>no user found</p>
              </>
            )}
          </div>
          <div className="user-page__prties"></div>
        </>
      )}

{(!showEditProfile && user) && (
      <button className="editProfileBtn" onClick={handleEditProfile}>
        Edit Profile
      </button>
)}
      {showResetPassword && (
        <ResetPassword user={user!} onClose={handleCloseResetPassword} onSave={handleSaveResetPassword} />
      )}
      <h2>My Events</h2>
    </div>
  </div>
);
      }
export default UserPage;
