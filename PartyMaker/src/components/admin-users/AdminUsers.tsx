import React, { useState } from 'react';
import NavBar from '../navBar/NavBar'
import './AdminUsers.scss'
import axios from 'axios';
import './AdminParties.scss';
import { useAppSelector } from '../../app/hook';
import { partiesSelector } from '../../features/parties/partiesSlice';
import { updateUser, deleteUser } from '../../../../server/API/users/usersCtrl';

const AdminUsers = () => {

  return (
    <div className='mainAdminUsers'>
        <NavBar />
        <h1>Users</h1>
      
    </div>
  )
}

export default AdminUsers
