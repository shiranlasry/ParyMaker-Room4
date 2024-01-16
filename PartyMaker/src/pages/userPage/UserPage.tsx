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


const UserPage: React.FC = () => {
  const user: User | null = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showEditProfile, setShowEditProfile] = useState(false);
 

  const handleSaveProfile = async (editedUser: User) => {
    try {
     const respons = await dispatch(editUserApi(editedUser))
     if (respons) {
       alert("Profile updated successfully");
       navigate("/");
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

  return (
 <div className="user-page-main">
    <NavBar />
  <div className="user-page">
    

    <div className="user-page__details">
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

    </div>


    <button className="editProfileBtn" onClick={handleEditProfile}>
        Edit Profile
      </button>
      {showEditProfile && (
        // Use the non-null assertion operator (!) here
        <EditProfileModal user={user!} onSave={handleSaveProfile} onClose={handleCloseEditProfile} />
      )}
      <h2>My Events</h2>
    </div>
  );
};

export default UserPage;
