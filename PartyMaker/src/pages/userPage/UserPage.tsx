import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/NavBar";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { Party, User } from "../../types-env";
import "../../components/editProfile/editProfile.scss";
import { Footer } from "../../components/footer/Footer";
import EditProfileModal from "../../components/editProfile/EditProfile";
import { userSelector } from "../../features/loggedInUser/userSlice";
import {partiesByUserIdSelector ,partiesByUserIdJoinedSelector} from "../../features/parties/partiesSlice";
import { editUserApi, getUserFromTokenApi } from "../../features/loggedInUser/userAPI";
import ResetPassword from "../../components/rest-password/ResetPassword";
import { updatePasswordApi } from "../../features/loggedInUser/userAPI";
import {partiesByUserId, partiesByUserIdJoined} from "../../features/parties/partiesAPI";
import PartyCard from "../../components/partyCard/PartyCard";
import "./userPage.scss";
import toast, { Toaster } from "react-hot-toast";


const UserPage: React.FC = () => {
  const user: User | null = useAppSelector(userSelector);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const partiesByUserIdArr :Party[] |null = useAppSelector(partiesByUserIdSelector);
  const partiesByUserJoinedIdArr :Party[] |null = useAppSelector(partiesByUserIdJoinedSelector);
  const dispatch = useAppDispatch();
  const getUserFromToken= async () => {
    try {
      
    await dispatch(getUserFromTokenApi());
     
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    // Call getUserFromToken when the component mounts
    getUserFromToken();
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  useEffect(() => {
    // Check if user is not null and has a user_id
    if (user && user.user_id) {
      dispatch(partiesByUserId(user.user_id));
      dispatch(partiesByUserIdJoined(user.user_id));
     }
  }, [user]); // Add user to dependency array to rerun the effect when user changes

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
    <div>
          <h2 className="myEventsTitle">🎊The Awesome parties I created💃</h2>
          <div className="parties-by-user-id">
            {partiesByUserIdArr && partiesByUserIdArr.length > 0 ? (
              partiesByUserIdArr.map((party) => (
                <PartyCard key={party.party_id} party={party} />
              ))
            ) : (
              <h3>No parties created yet.</h3>
            )}
          </div>
        </div>

        <div>
          <h2 className="myEventsTitle">The Awesome parties I joined 🐱‍👤</h2>
          <div className="parties-by-user-id">
            {partiesByUserJoinedIdArr && partiesByUserJoinedIdArr.length > 0 ? (
              partiesByUserJoinedIdArr.map((party) => (
                <PartyCard key={party.party_id} party={party} />
              ))
            ) : (
              <h3>No parties joined yet.</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;