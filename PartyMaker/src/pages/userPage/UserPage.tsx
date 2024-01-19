import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/NavBar";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { Party, User } from "../../types-env";
import "../../components/editProfile/editProfile.scss";
import { Footer } from "../../components/footer/Footer";
import EditProfileModal from "../../components/editProfile/EditProfile";
import { userSelector } from "../../features/loggedInUser/userSlice";
import {partiesByUserIdSelector} from "../../features/parties/partiesSlice";
import { editUserApi } from "../../features/loggedInUser/userAPI";
import ResetPassword from "../../components/rest-password/ResetPassword";
import { updatePasswordApi } from "../../features/loggedInUser/userAPI";
import {partiesByUserId} from "../../features/parties/partiesAPI";
import PartyCard from "../../components/partyCard/PartyCard";
import "./userPage.scss";
import toast, { Toaster } from "react-hot-toast";


const UserPage: React.FC = () => {
  const user: User | null = useAppSelector(userSelector);
  const partiesByUserIdArr :Party[] |null = useAppSelector(partiesByUserIdSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user) {
      if(!user.user_id) {
        toast.error("You must be logged in to view this page");
      }
      dispatch(partiesByUserId(user.user_id));
      console.log(`partiesByUserIdArr : ${partiesByUserIdArr}`);
    }

  },[]);

  const [showEditProfile, setShowEditProfile] = useState(false);

  const handleSaveProfile = async (editedUser: User) => {
    try {
      const respons = await dispatch(editUserApi(editedUser));

      if (respons) {
        toast.success("Profile updated successfully");
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
      
      const args = { user_id, password, newPassword, role };
      const response = await dispatch(updatePasswordApi(args));

      if (response) {
        toast.success("Password updated successfully");
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
    <Toaster position="top-right"/>
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
              <div className="userProfile">
                <h1>My Profile</h1>
                <div className="profile">
                <h2><span>Username: </span>{user.username}</h2>
                <h2><span>Email: </span>{user.email}</h2>
                <h2><span>First Name: </span>{user.first_name}</h2>
                <h2><span>Last Name: </span>{user.last_name}</h2>
                <h2><span>Adress: </span>{user.address}</h2>
                <h2><span>Phone Number: </span>{user.phone_number}</h2>
                </div>
              </div>
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
      <button className="resetPasswordBtn" onClick={handleResetPassword}>
  Reset Password
</button>

{showResetPassword && (
  <ResetPassword user={user!} onClose={handleCloseResetPassword} onSave={handleSaveResetPassword} />
)}
      <h2 className="myEventsTitle">🎊My Events💃</h2>
      <div className="parties-by-user-id">
      {partiesByUserIdArr && partiesByUserIdArr.map((party) => (
        <PartyCard key={party.party_id} party={party} />
      ))}
    </div>
    </div>
  </div>
);
      }
export default UserPage;
