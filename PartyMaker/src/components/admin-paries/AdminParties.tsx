import React, { useState } from 'react';
import NavBar from '../navBar/NavBar';
import './AdminParties.scss';
import { useAppSelector } from '../../app/hook';
import { partiesSelector } from '../../features/parties/partiesSlice';

const AdminParties = () => {
  const parties = useAppSelector(partiesSelector);
  if (!parties) return null;
  const [searchTerm, setSearchTerm] = useState('');

  const filteredParties = parties.filter(
    (party) =>
      party.party_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (party.party_date &&
        party.party_date.toString().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className='mainAdminParties'>
      <NavBar />
      <h1>Admin Parties</h1>

      <input
        type='text'
        placeholder='Search by name or date...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul>
        {filteredParties.map((party) => (
          <li key={party.party_id}>
            <p>Name: {party.party_name}</p>
            <p>Create Date: {party.party_date?.toLocaleString()}</p>
            {/* Add other party details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminParties;
