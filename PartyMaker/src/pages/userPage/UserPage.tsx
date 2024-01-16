import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/NavBar";
import { useAppSelector } from "../../app/hook";
import { User } from "../../types-env";
import "./userPage.scss";
import "../../components/editProfile/editProfile.scss";
import { Footer } from "../../components/footer/Footer";
import EditProfileModal from "../../components/editProfile/EditProfile";
import { userSelector } from "../../features/loggedInUser/userSlice";

const UserPage: React.FC = () => {
  const user: User | null = useAppSelector(userSelector);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const navigate = useNavigate();

  const handleSaveProfile = async (editedUser: User) => {
    try {
      // Handle the logic to save the edited user profile
      // You may need to send a request to the server to update the user details
      console.log("Saving user profile:", editedUser);
      // Example: Send a request to update the user details
      // await updateUserProfileApi(editedUser);
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
            <h1>{user.email}</h1>
            <h1>{user.first_name}</h1>
            <h1>{user.last_name}</h1>
            <h1>{user.address}</h1>
            <h1>{user.phone_number}</h1>
            
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
