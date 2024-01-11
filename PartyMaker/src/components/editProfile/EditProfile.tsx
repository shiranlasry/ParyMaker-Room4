import { useState } from "react";

const EditProfileModal = ({ user, onSave, onClose }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSave = () => {
    onSave(editedUser);
    onClose();
  };

  return (
    <div className="edit-profile-modal">
      <h2>Edit Profile</h2>
      <form>
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
        <button type="button" onClick={handleSave}>
          Save
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProfileModal;
