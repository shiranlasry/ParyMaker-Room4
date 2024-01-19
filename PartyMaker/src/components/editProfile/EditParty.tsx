import React, { useState } from 'react'
import { Party } from '../../types-env';

interface EditPartyProps {
    party: Party;
    onSave: (editedParty: Party) => void;
    onClose: () => void; 
    }

const EditParty : React.FC<EditPartyProps> = ({party, onSave, onClose}) => {
    const [editedParty, setEditedParty] = useState({ ...party });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedParty({ ...editedParty, [name]: value });
      };
      const handleSave = () => {
        onSave(editedParty);
        onClose();
      };
    
      return (
        <div className="editPartyWrap">
    <h2>Edit Party</h2>
    <label>Party Name:</label>
    <input
      type="text"
      name="party_name"
      value={editedParty.party_name}
      onChange={handleInputChange}
    />
    {/* Add similar input fields for other party details */}
    <button onClick={handleSave}>Save Changes</button>
    <button onClick={onClose}>Cancel</button>
  </div>
      );
    }


export default EditParty
