// PartyCard.jsx
import React from 'react';
import { Party } from '../../types-env';
import './partyCard.scss';

type PartyCardProps = {
    party: Party;
  };
  
  const PartyCard: React.FC<PartyCardProps> = ({ party }) => {
    return (
        <div className="party-card">
        <h1>{party.party_id}</h1>
        <h2>{party.party_name}</h2>
        <button className="join-button">Join Party</button>
      </div>
    );
  };
  
  export default PartyCard;
