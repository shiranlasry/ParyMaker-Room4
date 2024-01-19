import React, { useState } from 'react';
import NavBar from '../navBar/NavBar';
import './AdminParties.scss';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { partiesSelector } from '../../features/parties/partiesSlice';
import { deletePartyAPI } from '../../features/parties/partiesAPI';


const AdminParties = () => {
  const parties = useAppSelector(partiesSelector);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useAppDispatch();

  const filteredParties = parties?.filter(
    (party) =>
      party.party_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (party.party_date &&
        party.party_date.toString().includes(searchTerm.toLowerCase()))
  );

  const handleDeleteParty = async (partyId: number | null) => {
    try {
      if (!partyId || partyId === null) throw new Error('No party id');
      dispatch(deletePartyAPI(partyId));
    } catch (error) {
      console.error('Error deleting party:', error);
    }
  };

  const handleUpdateParty = async (partyId: number | null) => {
    try {
      // await axios.put(`/api/parties/partyConts/${partyId}`);
      // dispatch(updateParty({ partyId }));
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
        {filteredParties && filteredParties.map((party) => (
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


