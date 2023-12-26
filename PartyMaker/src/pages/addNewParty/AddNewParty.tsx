import React, { useState } from 'react';
import './addNewParty.scss';
import NavBar from '../../components/navBar/NavBar';

interface Party {
  partyType: string;
  participants: string;
  moneyPerParticipant: string;
  thingsToBring: string[];
}

const AddNewParty = () => {
  const [partyType, setPartyType] = useState<string>('');
  const [participants, setParticipants] = useState<string>('');
  const [moneyPerParticipant, setMoneyPerParticipant] = useState<string>('');
  const [thingsToBring, setThingsToBring] = useState<string>('');
  const [partyItems, setPartyItems] = useState<string[]>([]);
  const [createdParties, setCreatedParties] = useState<Party[]>([]);

  const handlePartyTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPartyType(e.target.value);
  };

  const handleParticipantsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParticipants(e.target.value);
  };

  const handleMoneyPerParticipantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMoneyPerParticipant(e.target.value);
  };

  const handleThingsToBringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThingsToBring(e.target.value);
  };

  const handleAddThing = () => {
    if (thingsToBring.trim() !== '') {
      setPartyItems([...partyItems, thingsToBring]);
      setThingsToBring('');
    }
  };

  const handleCreateParty = () => {
    if (partyType.trim() !== '' && participants.trim() !== '') {
      const newParty: Party = {
        partyType,
        participants,
        moneyPerParticipant,
        thingsToBring: partyItems,
      };
      setCreatedParties([...createdParties, newParty]);
      // Clear form fields after creating a party
      setPartyType('');
      setParticipants('');
      setMoneyPerParticipant('');
      setThingsToBring('');
      setPartyItems([]);
    }
  };

  return (
    <div>
      <NavBar />
      
      <div className='partyWrap'>
      <h1>My Party</h1>
      <form>
        <label htmlFor="partyType">Choose Party Type:</label>
        <select id="partyType" value={partyType} onChange={handlePartyTypeChange} required>
          <option value="" disabled>Select Party Type</option>
          <option value="Dance Party">Dance Party</option>
          <option value="Birthday Party">Birthday Party</option>
          <option value="Holiday Party">Holiday Party</option>
          {/* Add other party types as options */}
        </select>

        <label htmlFor="participants">Number of Participants:</label>
        <input type="number" id="participants" value={participants} onChange={handleParticipantsChange} required />

        <label htmlFor="moneyPerParticipant">Money Per Participant:</label>
        <input type="text" id="moneyPerParticipant" value={moneyPerParticipant} onChange={handleMoneyPerParticipantChange} />

        <label htmlFor="thingsToBring">Things to Bring:</label>
        <input type="text" id="thingsToBring" value={thingsToBring} onChange={handleThingsToBringChange} />
        
        <button type="button" onClick={handleAddThing}>
          Add
        </button>

        <ul>
          {partyItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <button type="button" className="submitBtn" onClick={handleCreateParty}>
          Create Party
        </button>
      </form>

      <div>
        <h2>Created Parties</h2>
        <ul>
          {createdParties.map((party, index) => (
            <li key={index}>
              <strong>{party.partyType}</strong> - Participants: {party.participants}
              {/* Add other party details as needed */}
              <button type="button">
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default AddNewParty;
