//admin-users page  
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { getAllUsersAPI } from '../../features/users/usersAPI';
import { usersSelector } from '../../features/users/usersSlice';
import { User } from '../../types-env';
import NavBar from '../navBar/NavBar';
import UserCard from '../user-card/UserCard';
import './AdminUsers.scss';

const AdminUsers = () => {
  const users = useAppSelector(usersSelector);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getAllUsersAPI());
  }, []);

  const filteredUsers = users?.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='mainAdminUsers'>
       <Toaster position="top-right"/>
      <NavBar />
      <div className='titleSearch'>
        <h1>Users Admin management</h1>
        <input
        className='adminSearch'
          type='text'
          placeholder='Search by name, email, or role...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='filteredUsers'>
        {filteredUsers &&
          filteredUsers.map((user: User) => (
            <div className='user' key={user.user_id}>
              <UserCard user={user} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminUsers;
