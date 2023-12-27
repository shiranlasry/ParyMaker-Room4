import React, { useState } from 'react';
import './addNewParty.scss';
import NavBar from '../../components/navBar/NavBar';
import { partyTypesData } from '../../utils/data';
import { Party, User } from '../../types-env';

const AddNewParty = () => {
  const initialPartyState: Party = {
    partyName: '',
    partyDate: '',
    partyTime: '',
    partyLocation: '',
    partyType: partyTypesData[0], // Default to the first party type
    partyDescription: '',
    partyPrice: 0,
    partyImage: '',
    partyCreator: {} as User,
    partyParticipants: [],
    thingsToBring: [],
    createdAt: new Date(),
  };

  const [newParty, setNewParty] = useState<Party>(initialPartyState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewParty({  ...newParty,  [name]: value, });
  };

  const handleCreateParty = () => {
    // You can add logic to handle the creation of the new party
    // For now, let's just log the new party data to the console
    console.log('New Party Data:', newParty);
    // Reset the form after handling the data
    setNewParty(initialPartyState);
  };

  return (
    <div>
      <NavBar />
      <div className="partyWrap">
        <h1>My New Party</h1>
        <form>
          <label>Party Name:</label>
          <input type="text" name="partyName" value={newParty.partyName} onChange={handleInputChange} />

          <label>Party Date:</label>
          <input type="date" name="partyDate" value={newParty.partyDate} onChange={handleInputChange} />

          <label>Party Time:</label>
          <input type="time" name="partyTime" value={newParty.partyTime} onChange={handleInputChange} />

          <label>Party Location:</label>
          <input type="text" name="partyLocation" value={newParty.partyLocation} onChange={handleInputChange} />

          <label>Party Type:</label>
          <select name="partyType" value={newParty.partyType.partyTypeName} onChange={handleInputChange}>
            {partyTypesData.map((type) => (
              <option key={type.partyTypeName} value={type.partyTypeName}>
                {type.partyTypeName}
              </option>
            ))}
          </select>

          <label>Party Description:</label>
          <textarea name="partyDescription" value={newParty.partyDescription} onChange={handleInputChange} />

          <label>Party Price:</label>
          <input type="number" name="partyPrice" value={newParty.partyPrice} onChange={handleInputChange} />

          <label>Party Image URL:</label>
          <input type="text" name="partyImage" value={newParty.partyImage} onChange={handleInputChange} />

          <button type="button" onClick={handleCreateParty}>
            Create Party
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewParty;
