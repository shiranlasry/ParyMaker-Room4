import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hook';
import NavBar from '../../components/navBar/NavBar';
import './AdminMain.scss' 


const AdminMain = () => {
        const navigate = useNavigate();
        const dispatch = useAppDispatch();
    return (
        <div className='adminMain'>
          <NavBar />
        <h1>Admin Main</h1>
        <button onClick={()=>navigate("/admin/parties")}>Parties</button>
        <button onClick={()=>navigate("/admin/users")}>Users</button>
      
    </div>
  )
}

export default AdminMain
