import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/NavBar";
import { useAppSelector } from "../../app/hook";
import { User } from "../../types-env";
import "./userPage.scss";
import "../../components/editProfile/editProfile.scss";
import { Footer } from "../../components/footer/Footer";
import EditProfileModal from "../../components/editProfile/EditProfile";

const UserPage: React.FC = () => {
  const user: User | null = useAppSelector((state) => state.user.value);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        try {
          const response = await fetch(`/party_maker/api/users/${user.user_id}`);
          const data = await response.json();
          // Assuming data contains the complete user details
          console.log("User Details:", data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUserDetails();
  }, [user]);

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
    <div className="userWrapper">
      <NavBar />
      <h2>My Profile</h2>
      {/* Display user details here */}
      <div className="userDetails">
      <p>Porfil Picture: </p>
        <p>Name: {user?.firstName} {user?.lastName}</p>
        <p>Email: {user?.email}</p>
        <p>Username: {user?.username}</p>
        <p>Phone Number: {user?.phoneNumber}</p>
        <p>Address: {user?.address}</p>
      </div>

      <button className="editProfileBtn" onClick={handleEditProfile}>
        Edit Profile
      </button>
      {showEditProfile && (
        // Use the non-null assertion operator (!) here
        <EditProfileModal user={user!} onSave={handleSaveProfile} onClose={handleCloseEditProfile} />
      )}
      <h2>My Events</h2>
      <Footer />
    </div>
  );
};

export default UserPage;
