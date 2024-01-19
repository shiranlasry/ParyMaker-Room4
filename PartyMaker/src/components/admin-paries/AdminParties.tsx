import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../navBar/NavBar';
import './AdminParties.scss';
import { useAppSelector } from '../../app/hook';
import { partiesSelector } from '../../features/parties/partiesSlice';
import { updateParty, deleteParty } from '../../api/parties/partyConts';

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

  const handleDeleteParty = async (partyId: number | null) => {
    try {
      await axios.delete(`/api/parties/${partyId}`);
      dispatch(deleteParty({ partyId }));
    } catch (error) {
      console.error('Error deleting party:', error);
    }
  };

  const handleUpdateParty = async (partyId: number | null) => {
    try {
      await axios.put(`/api/parties/partyConts/${partyId}`);
      dispatch(updateParty({ partyId }));
    } catch (error) {
      console.error('Error updating party:', error);
    }
  };

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
            <button onClick={() => handleDeleteParty(party.party_id)}>DELETE PARTY</button>
            <button onClick={() => handleUpdateParty(party.party_id)}>UPDATE PARTY</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminParties;
function dispatch(arg0: void) {
  throw new Error('Function not implemented.');
}

