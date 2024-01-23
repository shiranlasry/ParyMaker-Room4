import React, { useEffect, useState } from 'react'
import { User } from '../../types-env'
import './userCard.scss'
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { userSelector } from '../../features/loggedInUser/userSlice';
import { editUserApi, getUserFromTokenApi, updatePasswordApi } from '../../features/loggedInUser/userAPI';
import EditProfileModal from '../editProfile/EditProfile';
import toast from 'react-hot-toast';
import { getAllUsersAPI } from '../../features/users/usersAPI';
import ResetPassword from '../rest-password/ResetPassword';
type UserCardProps = {
  user: User;
};

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const randomImages: string[] = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlhoggWrGd9lCH5w1U1beZzf9p7RY1jKaH6Q&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTamq95RbRKnL2w1p8KyhKTu2VQ3PjSM_Kig&usqp=CAU', 'https://img.freepik.com/free-photo/handsome-man-with-glasses_144627-18665.jpg?size=626&ext=jpg&uid=R96966099&ga=GA1.2.9697832.1687471476&semt=ais', 'https://img.freepik.com/premium-photo/woman-beach-wearing-hat-sunglasses_863234-95.jpg?size=626&ext=jpg&uid=R96966099&ga=GA1.2.9697832.1687471476&semt=sph', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeN9C9rKuQKdYiUUrXzgzgGKlHCF8XNsi6hg&usqp=CAU']
  const dispatch = useAppDispatch();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const logInUser = useAppSelector(userSelector);
  useEffect(() => {
    if (!user) dispatch(getUserFromTokenApi());
  }, [])

  const onResetPassword = (user_id: number | null) => {
    setShowResetPassword(true)
  };
  const onUpdateUser = (user_id: number | null) => {
    setShowEditForm(true);
  };
  const onUpdateRole = (user_id: number | null) => { };
  const handleSaveProfile = async (editedUser: User) => {
    try {
      const respons = await dispatch(editUserApi(editedUser));
      debugger
      if (respons) {
        toast.success("Profile updated successfully");
        dispatch(getAllUsersAPI())
        //navigate("/");
      }

      setShowEditForm(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSaveResetPassword = async (user_id: number, password: string, newPassword: string, role: string
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
  const handleClose = () => {

    // set show edit form / password to false
    setShowEditForm(false);
    setShowResetPassword(false);
  };

  return (
    <div className='userCard-main'>
      <img className='userCard-main-img' src={randomImages[Math.floor(Math.random() * randomImages.length)]} alt="user" />
      <p className='userCard-main-username'>{user.username}</p>
      <p className='userCard-main-phone_number'>{user.phone_number}</p>
      {/* if user is admin or user is the same user that is logged in */}
      {logInUser && logInUser.role === 'admin' &&
        <>
          <button onClick={() => onResetPassword(logInUser.user_id)}>Reset Password</button>
          <button onClick={() => onUpdateUser(logInUser.user_id)}>Update User</button>
          <button onClick={() => onUpdateRole(logInUser.user_id)}>Update Role</button>
        </>
      }
      {
        showEditForm &&
        <div className='editForm'>
          <EditProfileModal user={user!} onSave={handleSaveProfile} onClose={handleClose} />
        </div>
      }
      {
        showResetPassword &&
        <div className='resetPassword'>
          <ResetPassword user={user!} onClose={handleClose} onSave={handleSaveResetPassword} />
        </div>
      }

    </div>
  )
}

export default UserCard
