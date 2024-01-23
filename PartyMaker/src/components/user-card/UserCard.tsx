import React, { useEffect, useState } from 'react'
import { User } from '../../types-env'
import './userCard.scss'
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { userSelector } from '../../features/loggedInUser/userSlice';
import { editUserApi, getUserFromTokenApi, updatePasswordApi } from '../../features/loggedInUser/userAPI';
import EditProfileModal from '../editProfile/EditProfile';
import toast, { Toaster } from 'react-hot-toast';
import { getAllUsersAPI } from '../../features/users/usersAPI';
import ResetPassword from '../rest-password/ResetPassword';
import UpdateUserRole from '../update-user-role/UpdateUserRole';
type UserCardProps = {
  user: User;
};

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const randomImages: string[] = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlhoggWrGd9lCH5w1U1beZzf9p7RY1jKaH6Q&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTamq95RbRKnL2w1p8KyhKTu2VQ3PjSM_Kig&usqp=CAU', 'https://img.freepik.com/free-photo/handsome-man-with-glasses_144627-18665.jpg?size=626&ext=jpg&uid=R96966099&ga=GA1.2.9697832.1687471476&semt=ais', 'https://img.freepik.com/premium-photo/woman-beach-wearing-hat-sunglasses_863234-95.jpg?size=626&ext=jpg&uid=R96966099&ga=GA1.2.9697832.1687471476&semt=sph', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeN9C9rKuQKdYiUUrXzgzgGKlHCF8XNsi6hg&usqp=CAU','https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQPN5mDYhq5TC5rbHesdU2NsUGCKk4_ixbWFwFvFPkrGURnW9YRqE6lvrjbPIkzV5fWQOlt9X0p5pnj6RonEW-sjYnhRjVfKyKlUZPx9Hg&usqp=CAc','https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQucEZ0chjgr-qNPknarvBvSxzOAkLxZECW-5R5VHY0DxRaIagRadXjijknPz-uKXBmzB-xpU3xZfClO39Yh-GsL11F2WhYtn5VNT9h0GA_K6WG9FGRMrK_lA&usqp=CAc','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDHLfNeH7tXEqq5LNZQJpvcWjQJZjr9hqZ-A&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA3DKHz-3RAKoIlsRJ3rwdQkTE3AFMDvRz2A&usqp=CAU']
  const dispatch = useAppDispatch();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showEditRole, setShowEditRole] = useState(false);
  const logInUser = useAppSelector(userSelector);
  useEffect(() => {
    if (!user) dispatch(getUserFromTokenApi());
  }, [])

  const onResetPassword = () => {
    setShowResetPassword(true)
    setShowEditForm(false);
    setShowEditRole(false);
  };
  const onUpdateUser = () => {
    setShowEditForm(true);
    setShowResetPassword(false)
    setShowEditRole(false);
  };
  const onUpdateRole = () => {
    setShowEditRole(true);
    setShowEditForm(false);
    setShowResetPassword(false)
   };
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
    setShowEditRole(false);
  };


  return (
    <div className='userCard-main'>
       <Toaster position="top-right"/>
      <img className='userCard-main-img' src={randomImages[Math.floor(Math.random() * randomImages.length)]} alt="user" />
      <p className='userCard-main-email'>{user.email}</p>
      <p className='userCard-main-username'>{user.username}</p>
      <p className='userCard-main-phone_number'>{user.role}</p>
      {/* if user is admin or user is the same user that is logged in */}
      {logInUser && logInUser.role === 'admin' &&
        <>
          <button onClick={() => onResetPassword()}>Reset Password</button>
          <button onClick={() => onUpdateUser()}>Update User</button>
          <button onClick={() => onUpdateRole()}>Update Role</button>
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
      {
        showEditRole &&
        <div className='editRole'>
         <UpdateUserRole user={user!} onClose={handleClose}  />
        </div>
      }

    </div>
  )
}

export default UserCard
