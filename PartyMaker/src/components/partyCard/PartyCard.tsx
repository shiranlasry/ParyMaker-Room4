// PartyCard.jsx
import React from 'react';
import { Party } from '../../types-env';

type PartyCardProps = {
    party: Party;
  };
  
  const PartyCard: React.FC<PartyCardProps> = ({ party }) => {
    return (
      <div className="party-card">
        <h2>{party.partyName}</h2>
        {/* Add more details or styling as needed */}
      </div>
    );
  };
  
  export default PartyCard;
