import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/NavBar";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { Party, User } from "../../types-env";
import "./userPage.scss";
import "../../components/editProfile/editProfile.scss";
import { Footer } from "../../components/footer/Footer";
import EditProfileModal from "../../components/editProfile/EditProfile";
import { userSelector } from "../../features/loggedInUser/userSlice";
import { editUserApi } from "../../features/loggedInUser/userAPI";
import ResetPassword from "../../components/rest-password/ResetPassword";
import { updatePasswordApi } from "../../features/loggedInUser/userAPI";
import HOtParties from "../../components/hotParties/HOtParties"; // Import the component used for rendering parties

const UserPage: React.FC = () => {
  const user: User | null = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Added navigate hook

  const [showEditProfile, setShowEditProfile] = useState(false);
  const
  const handleSaveProfile = async (editedUser: User) => {
    try {
      const respons = await dispatch(editUserApi(editedUser));

      if (respons) {
        alert("Profile updated successfully");
        // navigate("/"); // Uncomment this line if you want to navigate to the home page after profile update
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
        // navigate("/"); // Uncomment this line if you want to navigate to the home page after password update
      }

      setShowResetPassword(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch user's parties when the component mounts
  useEffect(() => {
    const fetchUserParties = async () => {
      try {
        if (user) {
          const response = await fetch(`/api/get-user-parties/${user.user_id}`);
          const data = await response.json();
          setUserParties(data.parties);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserParties();
  }, [dispatch, user]);

  return (
    <div className="UPmain">
      <NavBar />
      <div className="userPage">
        {showEditProfile ? (
          // If showEditProfile is true, render the edit profile form
          <>
            <EditProfileModal
              user={user!}
              onSave={handleSaveProfile}
              onClose={handleCloseEditProfile}
            />
          </>
        ) : (
          <>
            <div className="UPdetails">
              {user ? (
                <div className="userProfile">
                  <h1>My Profile</h1>
                  <div className="profile">
                    <h2>
                      <span>Username: </span>
                      {user.username}
                    </h2>
                    <h2>
                      <span>Email: </span>
                      {user.email}
                    </h2>
                    <h2>
                      <span>First Name: </span>
                      {user.first_name}
                    </h2>
                    <h2>
                      <span>Last Name: </span>
                      {user.last_name}
                    </h2>
                    <h2>
                      <span>Adress: </span>
                      {user.address}
                    </h2>
                    <h2>
                      <span>Phone Number: </span>
                      {user.phone_number}
                    </h2>
                  </div>
                </div>
              ) : (
                <>
                  <p>no user found</p>
                </>
              )}
            </div>
            <div className="user-page__prties">
              {userParties.map((party: Party) => (
                // Render each party here using the PartyCard component or custom rendering logic
                <div key={party.party_id}>{party.party_name}</div>
              ))}
            </div>
          </>
        )}

        {!showEditProfile && user && (
          <button className="editProfileBtn" onClick={handleEditProfile}>
            Edit Profile
          </button>
        )}

        <button className="resetPasswordBtn" onClick={handleResetPassword}>
          Reset Password
        </button>

        {showResetPassword && (
          <ResetPassword
            user={user!}
            onClose={handleCloseResetPassword}
            onSave={handleSaveResetPassword}
          />
        )}
        <h2>My Events</h2>
      </div>
    </div>
  );
};

export default UserPage;
