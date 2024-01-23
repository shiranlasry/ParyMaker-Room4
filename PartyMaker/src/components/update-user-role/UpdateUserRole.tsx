import React, { useEffect } from 'react';
import { User } from '../../types-env';
import { useAppDispatch } from '../../app/hook';
import { updateUserRoleApi } from '../../features/loggedInUser/userAPI';
import { getAllUsersAPI } from '../../features/users/usersAPI';

type UserProps = {
  user: User;
  onClose: () => void;
};

const UpdateUserRole: React.FC<UserProps> = ({ user, onClose }) => {
  const dispatch = useAppDispatch();

  const handelSaveRole = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      // Use e.currentTarget.role?.value to safely access the value property
      
      const roleElement = e.currentTarget.querySelector('#role') as HTMLSelectElement | null;
      const role = roleElement?.value;
      if (!role || !user.user_id) return;

      const arg = { user_id: user.user_id, role: role };

       await dispatch(updateUserRoleApi(arg));

       dispatch(getAllUsersAPI());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handelSaveRole}>
        <select name="role" id="role">
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
        <input type="submit" value="Update Role" />
        <input type="reset" value="Cancel" onClick={onClose} />
      </form>
    </div>
  );
};

export default UpdateUserRole;
