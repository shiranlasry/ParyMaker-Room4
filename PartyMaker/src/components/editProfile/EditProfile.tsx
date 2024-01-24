import { useState } from "react";
import { User } from "../../types-env";
import "./editProfile.scss";

interface EditProfileModalProps {
  user: User;
  onSave: (editedUser: User) => void;
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  user,
  onSave,
  onClose,
}) => {
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
        <label>Email: {user.email}</label>

        <label>Role: {user.role}</label>

        <label>User Name:</label>
        <input
          type="text"
          name="username"
          value={editedUser.username}
          onChange={handleInputChange}
        />
        <label>First Name:</label>
        <input
          type="text"
          name="first_name"
          value={editedUser.first_name}
          onChange={handleInputChange}
        />
        <label>Last Name:</label>
        <input
          type="text"
          name="last_name"
          value={editedUser.last_name}
          onChange={handleInputChange}
        />
        <label>Phone Number:</label>
        <input
          type="text"
          name="phone_number"
          value={editedUser.phone_number}
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
