import React, { useState } from 'react';
import NavBar from '../navBar/NavBar';
import './AdminParties.scss';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { partiesSelector } from '../../features/parties/partiesSlice';
import { deletePartyAPI, updatePartyAPI } from '../../features/parties/partiesAPI';
import { userSelector } from '../../features/loggedInUser/userSlice';
import PartyCard from '../partyCard/PartyCard';
import toast from 'react-hot-toast';
import { Party } from '../../types-env';
import EditParty from '../editProfile/EditParty';


const AdminParties = () => {
  const parties = useAppSelector(partiesSelector);
  const user = useAppSelector(userSelector);
  const [showEditParty, setShowEditParty] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useAppDispatch();

  const filteredParties = parties?.filter(
    (party) =>
      party.party_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (party.party_date &&
        party.party_date.toString().includes(searchTerm.toLowerCase()))
  );
  const handleSaveParty = async (editedParty: Party) => {
    try {
      const respons = await dispatch(updatePartyAPI(editedParty));

      if (respons) {
        toast.success("Profile updated successfully");
        //navigate("/");
      }

      setShowEditParty(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleShowUpdateForm = () => {
    setShowEditParty(true);
  };
  const handleCloseUpdateForm = () => {
    setShowEditParty(false);
  };

  const handleDeleteParty = async (partyId: number | null) => {
    try {
      if (!partyId) throw new Error('No party id');
      if (!user?.user_id) throw new Error('No user id');
      const args = { partyId, role: user.role }; 
      dispatch(deletePartyAPI(args));
    } catch (error) {
      console.error('Error deleting party:', error);
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

      
        {filteredParties && filteredParties.map((party) => (
          <div className='party-card-admin'>
           <PartyCard key={party.party_id} party={party} />
            <button onClick={() => handleDeleteParty(party.party_id)}>DELETE PARTY</button>
            <button onClick={handleShowUpdateForm}>UPDATE PARTY</button>
            {showEditParty && (
              <EditParty
                party={party}
                onSave={handleSaveParty}
                onClose={handleCloseUpdateForm}
              />
            )}
            </div>
            
        ))}

     
      
    </div>
  );
};

export default AdminParties;


