import { useState } from "react";
import "../editProfile/editProfile.scss"
import { User } from "../../types-env";

interface EditProfileModalProps {
  user: User;
  onSave: (editedUser: User) => void;
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ user, onSave, onClose }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSave = () => {
    onSave(editedUser);
    onClose();
  };

  return (
    <div className="editProfileWrap">
      
      <form className="editProfileForm">
      <h2 className="editProTitle">Edit Profile</h2>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={editedUser.email}
          onChange={handleInputChange}
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={editedUser.password}
          onChange={handleInputChange}
        />
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={editedUser.username}
          onChange={handleInputChange}
        />
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={editedUser.firstName}
          onChange={handleInputChange}
        />
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={editedUser.lastName}
          onChange={handleInputChange}
        />
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={editedUser.phoneNumber}
          onChange={handleInputChange}
        />
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={editedUser.address}
          onChange={handleInputChange}
        />
        <div>
        <button className="saveBtn" type="button" onClick={handleSave}>
          Save
        </button>
        <button className="cancelBtn" type="button" onClick={onClose}>
          Cancel
        </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileModal;
